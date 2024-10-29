export interface UserProfile {
    height: number;  // in cm
    weight: number;  // in kg
    age: number;
    gender: 'male' | 'female';
    goal: 'lose' | 'maintain' | 'gain';
    timeframe: number;  // in weeks
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'very' | 'extra';
  }
  
  export interface NutritionGoals {
    dailyCalories: number;
    protein: number;  // in grams
    carbs: number;    // in grams
    fat: number;      // in grams
    isCustom: boolean; // flag to indicate if these are custom goals
  }