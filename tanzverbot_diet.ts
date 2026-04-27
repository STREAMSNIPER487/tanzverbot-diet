export enum Sex {
  Male = "m",
  Female = "f",
}

type FoodEntry = {
  name: string;
  caloriesPerServing: number;
  servingsPerDay: number;
};

const foodPlan: FoodEntry[] = [
  {
    name: "Kellogg's Tresor",
    caloriesPerServing: 137,
    servingsPerDay: 4,
  },
  {
    name: "Weihenstephan Haltbare Milch",
    caloriesPerServing: 64,
    servingsPerDay: 8,
  },
  {
    name: "Mühle Frikadellen",
    caloriesPerServing: 271,
    servingsPerDay: 4,
  },
  {
    name: "Volvic Tee",
    caloriesPerServing: 40,
    servingsPerDay: 12,
  },
  {
    name: "Neuburger lockerer Sahnepudding",
    caloriesPerServing: 297,
    servingsPerDay: 1,
  },
  {
    name: "Lagnese Viennetta",
    caloriesPerServing: 125,
    servingsPerDay: 6,
  },
  {
    name: "Schöller 10ForTwo",
    caloriesPerServing: 482,
    servingsPerDay: 2,
  },
  {
    name: "Ristorante Pizza Salame",
    caloriesPerServing: 835,
    servingsPerDay: 2,
  },
  {
    name: "Schweppes Ginger Ale",
    caloriesPerServing: 37,
    servingsPerDay: 25,
  },
  {
    name: "Mini Babybel",
    caloriesPerServing: 59,
    servingsPerDay: 20,
  },
];

function validateInputs(weightGainKg: number, heightM: number, ageY: number) {
  if (weightGainKg < 0) {
    throw new Error(`This diet is for gaining weight, not loosing it!`);
  }
  if (ageY < 16 || heightM < 1.5) {
    throw new Error(`You do not qualify for this kind of diet.`);
  }
}

function calcDailyCaloriesOnDiet(plan: FoodEntry[]): number {
  return plan.reduce((sum, food) => {
    return sum + food.caloriesPerServing * food.servingsPerDay;
  }, 0);
}

function calcBasicMetabolicRate(
  weightKg: number,
  heightM: number,
  ageY: number,
  sex: Sex,
): number {
  if (sex === Sex.Male) {
    // Harris-Benedict-Formula (Male)
    return Math.ceil(66.47 + 13.7 * weightKg + 5.003 * heightM * 100.0 - 6.75 * ageY);
  }

  // Harris-Benedict-Formula (Female)
  return Math.ceil(655.1 + 9.563 * weightKg + 1.85 * heightM * 100.0 - 4.676 * ageY);
}

function calcDailyExcessCalories(
  dailyCaloriesOnDiet: number,
  dailyCaloriesBasicMetabolicRate: number,
): number {
  const dailyExcessCalories = dailyCaloriesOnDiet - dailyCaloriesBasicMetabolicRate;
  if (dailyExcessCalories <= 0) {
    throw new Error("This diet is not sufficient for you to gain weight.");
  }
  return dailyExcessCalories;
}

export function calcDateOnDiet(
  currentWeightKg: number,
  targetWeightKg: number,
  heightM: number,
  ageY: number,
  sex: Sex,
): number {
  const weightGainKg = targetWeightKg - currentWeightKg;
  validateInputs(weightGainKg, heightM, ageY);
  const dailyCaloriesOnDiet = calcDailyCaloriesOnDiet(foodPlan);
  const dailyCaloriesBasicMetabolicRate = calcBasicMetabolicRate(currentWeightKg, heightM, ageY, sex);
  const dailyExcessCalories = calcDailyExcessCalories(
    dailyCaloriesOnDiet,
    dailyCaloriesBasicMetabolicRate,
  );
  return Math.ceil((9000 * weightGainKg) / dailyExcessCalories);
}
