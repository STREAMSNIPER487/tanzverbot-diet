import { assertEquals, assertThrows } from "@std/assert";
import { calcDateOnDiet, Sex } from "./tanzverbot_diet.ts";

Deno.test("returns deterministic days for male example", () => {
  assertEquals(calcDateOnDiet(74, 100, 1.86, 38, Sex.Male), 36);
});

Deno.test("throws when target is below current weight", () => {
  assertThrows(() => calcDateOnDiet(80, 75, 1.8, 25, Sex.Male));
});

Deno.test("throws when profile does not qualify", () => {
  assertThrows(() => calcDateOnDiet(50, 55, 1.45, 15, Sex.Female));
});
