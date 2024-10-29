import prisma from '@/lib/prisma'

export function formatWhatsAppMessage(data: {
  foodName: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fact: string
}) {
  return `🍽️ *Food Analysis*

📝 Food: ${data.foodName}

📊 *Nutrition Facts:*
🔸 Calories: ${Math.round(data.calories)} kcal
🔸 Protein: ${Math.round(data.protein)}g
🔸 Carbs: ${Math.round(data.carbs)}g
🔸 Fat: ${Math.round(data.fat)}g
🔸 Fact: ${data.fact}


Reply:
"today" - See today's total
"week" - Get weekly summary`
}

export async function generateDailySummary(phone: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const entries = await prisma.foodEntry.findMany({
    where: {
      phone,
      createdAt: {
        gte: today
      }
    }
  })

  const totalCalories = entries.reduce((sum:any, entry:any) => sum + entry.calories, 0)
  const totalProtein = entries.reduce((sum:any, entry:any) => sum + entry.protein, 0)
  const totalCarbs = entries.reduce((sum:any, entry:any) => sum + entry.carbs, 0)
  const totalFat = entries.reduce((sum:any, entry:any) => sum + entry.fat, 0)

  const profile = await prisma.userProfile.findUnique({
    where: { phone },
    include: { nutritionGoals: true }
  });


  return `📆 *Today's Summary*

🔢 *Total Meals:* ${entries.length}

📊 *Total Nutrition:*
🔸 Calories: ${Math.round(totalCalories)} kcal
🔸 Protein: ${Math.round(totalProtein)}g
🔸 Carbs: ${Math.round(totalCarbs)}g
🔸 Fat: ${Math.round(totalFat)}g

*Foods Logged:*
${entries.map((entry:any) => `• ${entry.foodName}`).join('\n')} 
 
${profile &&`
📈 *Current Goals:* 
🔸 Calories: ${profile.nutritionGoals?.dailyCalories} kcal
🔸 Protein: ${profile.nutritionGoals?.protein}g
🔸 Carbs: ${profile.nutritionGoals?.carbs}g
🔸 Fat: ${profile.nutritionGoals?.fat}g
`
}
`;


}

export async function generateWeeklySummary(phone: string) {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const entries = await prisma.foodEntry.findMany({
    where: {
      phone,
      createdAt: {
        gte: oneWeekAgo
      }
    }
  });

  if (entries.length === 0) {
    return "No food entries found for the past week.";
  }

  const totals = entries.reduce((acc, entry) => ({
    calories: acc.calories + (entry.calories || 0),
    protein: acc.protein + (entry.protein || 0),
    carbs: acc.carbs + (entry.carbs || 0),
    fat: acc.fat + (entry.fat || 0)
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  return `📊 Weekly Summary:
Total Calories: ${Math.round(totals.calories)} kcal
Protein: ${Math.round(totals.protein)}g
Carbs: ${Math.round(totals.carbs)}g
Fat: ${Math.round(totals.fat)}g
Meals logged: ${entries.length}`;
}

export async function viewProfile(phone: string) {
  const profile = await prisma.userProfile.findUnique({
    where: { phone },
    include: { nutritionGoals: true }
  });

  if (!profile) {
    return "Profile not found. Use 'setup' command to create one.";
  }

  return `📊 Your Profile:
Height: ${profile.height}cm
Weight: ${profile.weight}kg
Age: ${profile.age}
Gender: ${profile.gender}
Goal: ${profile.goal}
Timeframe: ${profile.timeframe} weeks
Activity Level: ${profile.activityLevel}

📈 Current Goals${profile.nutritionGoals?.isCustom ? ' (Custom)' : ''}:
Calories: ${profile.nutritionGoals?.dailyCalories} kcal
Protein: ${profile.nutritionGoals?.protein}g
Carbs: ${profile.nutritionGoals?.carbs}g
Fat: ${profile.nutritionGoals?.fat}g`;
}