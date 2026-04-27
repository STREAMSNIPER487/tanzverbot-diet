import { assertEquals, assertThrows } from "@std/assert";
import {
  calcDateOnDiet,
  Sex,
  TANZVERBOT_DIET_2018,
  TANZVERBOT_DIET_CLASSIC,
  type DietPlan,
} from "./tanzverbot_diet.ts";

Deno.test("returns deterministic days for male example with average-weight BMR", () => {
  assertEquals(calcDateOnDiet(74, 100, 1.86, 38, Sex.Male), 37);
});

Deno.test("throws when target is below current weight", () => {
  assertThrows(() => calcDateOnDiet(80, 75, 1.8, 25, Sex.Male));
});

Deno.test("throws when profile does not qualify", () => {
  assertThrows(() => calcDateOnDiet(50, 55, 1.45, 15, Sex.Female));
});

Deno.test("supports a custom diet plan table", () => {
  const customPlan: DietPlan = {
    name: "Custom High Calorie",
    entries: [
      { name: "Shake", caloriesPerServing: 1200, servingsPerDay: 5 },
      { name: "Snack", caloriesPerServing: 700, servingsPerDay: 6 },
    ],
  };

  const daysClassic = calcDateOnDiet(74, 100, 1.86, 38, Sex.Male, TANZVERBOT_DIET_CLASSIC);
  const daysCustom = calcDateOnDiet(74, 100, 1.86, 38, Sex.Male, customPlan);
  assertEquals(daysCustom < daysClassic, true);
});

Deno.test("supports calculation with the 2018 diet configuration", () => {
  assertEquals(calcDateOnDiet(74, 80, 1.86, 38, Sex.Male, TANZVERBOT_DIET_2018) > 0, true);
});
