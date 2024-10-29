import { UserProfile, NutritionGoals } from './types';

const activityMultipliers = {
  sedentary: 1.2,   // Little or no exercise
  light: 1.375,     // Light exercise 1-3 times/week
  moderate: 1.55,   // Moderate exercise 3-5 times/week
  very: 1.725,      // Heavy exercise 6-7 times/week
  extra: 1.9        // Very heavy exercise, physical job
};

function calculateBMR(profile: UserProfile): number {
  const { weight, height, age, gender } = profile;
  
  if (gender === 'male') {
    return (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    return (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }
}

export function calculateNutritionGoals(profile: UserProfile): NutritionGoals {
  const bmr = calculateBMR(profile);
  const tdee = bmr * activityMultipliers[profile.activityLevel];
  
  let dailyCalories = tdee;
  switch (profile.goal) {
    case 'lose':
      dailyCalories = tdee * 0.8;
      break;
    case 'gain':
      dailyCalories = tdee * 1.15;
      break;
  }

  const protein = profile.weight * 2;
  const fat = (dailyCalories * 0.25) / 9;
  const carbCalories = dailyCalories - (protein * 4) - (fat * 9);
  const carbs = carbCalories / 4;

  return {
    dailyCalories: Math.round(dailyCalories),
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fat: Math.round(fat),
    isCustom: false
  };
}