import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import twilio from 'twilio';
import { analyzeImage } from '@/lib/gemini';
import { formatWhatsAppMessage, generateDailySummary, generateWeeklySummary, viewProfile } from '@/lib/whatsapp';
import { calculateNutritionGoals } from '@/lib/nutrition/calculator';
import { SETUP_MESSAGE, GOALS_MESSAGE, HELP_MESSAGE, WELCOME_MESSAGE } from '@/lib/nutrition/messages';
import { UserProfile, NutritionGoals } from '@/lib/nutrition/types';

const MessagingResponse = twilio.twiml.MessagingResponse;

const PAYMENT_MESSAGE = `💰 Subscribe to unlock unlimited meal tracking!

Price: $30/year
Payment Link: https://paypal.me/lamichhaneamrita.1995

Steps:
1. Make the payment using the link above
2. Take a screenshot of your payment confirmation
3. Reply with "sendpayment"
4. Send your payment screenshot when prompted
5. We'll verify within 24 hours

Current limitations for free users:
- Maximum 2 meals per day
- Basic tracking features only`;

// Check if user can add meal
async function canAddMeal(phone: string): Promise<{ 
  allowed: boolean; 
  message?: string 
}> {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const profile = await prisma.userProfile.findUnique({
    where: { phone }
  });

  if (!profile) {
    return { 
      allowed: false, 
      message: "Please set up your profile first using the 'setup' command." 
    };
  }

  // Reset meal count if it's a new day
  if (profile.lastMealDate !== today) {
    await prisma.userProfile.update({
      where: { phone },
      data: {
        mealCount: 0,
        lastMealDate: today
      }
    });
    return { allowed: true };
  }

  // Check if user has reached daily limit
  if (!profile.isSubscribed && profile.mealCount >= 2) {
    return {
      allowed: false,
      message: `❌ You've reached today's limit of 2 meals.

💡 Want unlimited meals? Type 'pay' to subscribe!

Your current meal count: ${profile.mealCount}/2
Subscription status: ${profile.isSubscribed ? '✅ Active' : '❌ Free user'}`
    };
  }

  return { allowed: true };
}

// Update meal count
async function incrementMealCount(phone: string): Promise<void> {
  const today = new Date().toISOString().split('T')[0];
  
  await prisma.userProfile.update({
    where: { phone },
    data: {
      mealCount: {
        increment: 1
      },
      lastMealDate: today
    }
  });
}

async function handleProfileSetup(message: string, phone: string) {
  const parts = message.toLowerCase().split(',').map(p => p.trim());
  
  if (parts.length !== 7) {
    return SETUP_MESSAGE;
  }

  const [height, weight, age, gender, goal, timeframe, activityLevel] = parts;

  const profile: UserProfile = {
    height: parseFloat(height),
    weight: parseFloat(weight),
    age: parseInt(age),
    gender: gender as 'male' | 'female',
    goal: goal as 'lose' | 'maintain' | 'gain',
    timeframe: parseInt(timeframe),
    activityLevel: activityLevel as 'sedentary' | 'light' | 'moderate' | 'very' | 'extra'
  };

  // Calculate and save goals
  const goals = calculateNutritionGoals(profile);
  
  // Save profile and goals
  const savedProfile = await prisma.userProfile.upsert({
    where: { phone },
    update: profile,
    create: {
      phone,
      ...profile,
    }
  });

  await prisma.nutritionGoals.upsert({
    where: { userProfileId: savedProfile.id },
    update: goals,
    create: {
      userProfileId: savedProfile.id,
      ...goals
    }
  });

  return `✅ Profile saved! Your daily targets:
Calories: ${goals.dailyCalories} kcal
Protein: ${goals.protein}g
Carbs: ${goals.carbs}g
Fat: ${goals.fat}g

You can customize these goals using the "setgoals" command.`;
}

async function handleCustomGoals(message: string, phone: string) {
  const goalParts = message.replace('goals:', '').split(',').map(p => parseInt(p.trim()));
  
  if (goalParts.length !== 4) {
    return GOALS_MESSAGE;
  }

  const [calories, protein, carbs, fat] = goalParts;

  const profile = await prisma.userProfile.findUnique({
    where: { phone },
    include: { nutritionGoals: true }
  });

  if (!profile) {
    return "Please set up your profile first using the 'setup' command.";
  }

  const goals: NutritionGoals = {
    dailyCalories: calories,
    protein,
    carbs,
    fat,
    isCustom: true
  };

  await prisma.nutritionGoals.upsert({
    where: { userProfileId: profile.id },
    update: goals,
    create: {
      userProfileId: profile.id,
      ...goals
    }
  });

  return `✅ Custom goals saved!
Daily Calories: ${calories} kcal
Protein: ${protein}g
Carbs: ${carbs}g
Fat: ${fat}g`;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const message = formData.get('Body') as string;
    const mediaUrl = formData.get('MediaUrl0') as string | null;
    const phone = formData.get('From') as string;
    const twiml = new MessagingResponse();

    // Handle image message (food tracking)
    if (mediaUrl) {
      // First check if this is a payment screenshot
      const profile = await prisma.userProfile.findUnique({
        where: { phone }
      });

      // If last message was 'sendpayment', treat this as payment screenshot
      if (message?.toLowerCase().trim() === 'sendpayment' || 
          (profile?.lastMealDate === 'AWAIT_PAYMENT')) {
        await prisma.userProfile.update({
          where: { phone },
          data: {
            paymentImageUrl: mediaUrl,
            lastMealDate: new Date().toISOString().split('T')[0] // Reset to today
          }
        });

        twiml.message(`✅ Payment screenshot received! We'll verify within 24 hours.`);
      } 
      // Otherwise treat as food image
      else {
        // Check meal limit
        const mealCheck = await canAddMeal(phone);
        if (!mealCheck.allowed) {
          twiml.message(mealCheck.message!);
          return new NextResponse(twiml.toString(), {
            headers: { 'Content-Type': 'text/xml' }
          });
        }

        let foodName = '';
        let nutrition = null;

        if (message?.trim()) {
          foodName = message.trim();
        }

        nutrition = await analyzeImage({imageUrl: mediaUrl, food: foodName});

        if (nutrition) {
          const { fact, ...nutritionWithoutFact } = nutrition;

          await prisma.foodEntry.create({
            data: {
              phone,
              imageUrl: mediaUrl,
              ...nutritionWithoutFact
            }
          });

          await incrementMealCount(phone);
          twiml.message(formatWhatsAppMessage(nutrition));
        } else {
          twiml.message(
            'Sorry, I couldn\'t analyze that image. Please try again with a clearer photo.' +
            '\nTip: You can also include the name of the food in your message for better accuracy!'
          );
        }
      }
    }
    // Handle text commands
    else if (message) {
      const command = message.toLowerCase().trim();
      
      if (command.startsWith('goals:')) {
        const response = await handleCustomGoals(message, phone);
        twiml.message(response);
      } else if (message.includes(',')) {
        const response = await handleProfileSetup(message, phone);
        twiml.message(response);
      } else {
        switch (command) {
          case 'pay':
            twiml.message(PAYMENT_MESSAGE);
            break;
  
          case 'sendpayment':
            // Mark user as awaiting payment screenshot
            await prisma.userProfile.update({
              where: { phone },
              data: {
                lastMealDate: 'AWAIT_PAYMENT' // Special flag
              }
            });
            twiml.message('📸 Please send your payment screenshot now.');
            break;

          case 'setup':
            twiml.message(SETUP_MESSAGE);
            break;

          case 'setgoals':
            twiml.message(GOALS_MESSAGE);
            break;

          case 'goals':
          case 'profile':
            const profileInfo = await viewProfile(phone);
            twiml.message(profileInfo);
            break;

          case 'today':
            const summary = await generateDailySummary(phone);
            twiml.message(summary);
            break;

          case 'week':
            const weekSummary = await generateWeeklySummary(phone);
            twiml.message(weekSummary);
            break;

          case 'help':
            twiml.message(HELP_MESSAGE);
            break;

          default:
            twiml.message(WELCOME_MESSAGE);
        }
      }
    }

    return new NextResponse(twiml.toString(), {
      headers: { 'Content-Type': 'text/xml' }
    });

  } catch (error) {
    console.error('Webhook error:', error);
    const twiml = new MessagingResponse();
    twiml.message('Sorry, something went wrong. Please try again.');
    return new NextResponse(twiml.toString(), {
      headers: { 'Content-Type': 'text/xml' }
    });
  }
}