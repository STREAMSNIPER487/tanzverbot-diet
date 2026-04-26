import { Sex, calcDateOnDiet } from "./tanzverbot_diet.ts";

const fromWeight = 78.0;
const toWeight = 100.0;
const height = 1.88;
const age = 38;
const sex = Sex.Male;
const days = calcDateOnDiet(fromWeight, toWeight, height, age, sex);
console.log(`You need to diet for ${days} days to reach your target.`);
