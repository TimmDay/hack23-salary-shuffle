import { BucketResults } from "./types";

// https://www.ato.gov.au/Rates/Tax-rates---Australian-residents/
/** INCOME TAX BRACKETS 
    0. 0, 18200, 0
    1. 18201, 45000, 19
    2. 45001, 120000, 32.5
    3. 120001, 180000, 37
    4. 180001, Infinity, 45
*/
const RATES = [0, 0.19, 0.325, 0.37, 0.45];

export function getYAxis(income: number) {
  switch (getTopTaxBracket(income)) {
    case 0:
      return 20000;
    case 1:
      return 30000;
    case 2:
      const inBracketBit = income - 45001;
      if (inBracketBit < 52000) return 40000;
      if (inBracketBit < 60000) return 50000;
      if (inBracketBit < 68000) return 55000;
      if (inBracketBit < 85000) return 70000;
      return 80000;
    case 3:
      return 80000;
    case 4:
      const inBracketBit4 = income - 180001;
      if (inBracketBit4 < 117000) return 80000;
      return inBracketBit4 + 1;
    default:
      return 80000;
  }
}

// Calculate the numbers needed to plot the chart.
export function taxBucket(
  annualSalary: number,
  bucketMin: number,
  bucketMax: number,
  taxPercent: number
): BucketResults {
  const bucketCapacity = bucketMax - bucketMin;
  let taxPaid = 0,
    remIncome = 0;

  if (annualSalary >= bucketMax) {
    taxPaid = (bucketCapacity * taxPercent) / 100;
    remIncome = bucketCapacity - taxPaid;
  }
  if (bucketMin < annualSalary && annualSalary < bucketMax) {
    const chunk = annualSalary - bucketMin;
    taxPaid = chunk * (taxPercent / 100);
    remIncome = chunk - taxPaid;
  }

  return {
    taxPaid,
    remIncome,
    bucketCapacity,
    bucketMin,
    bucketMax,
    taxRate: taxPercent,
  };
}

export const mockShaving = {
  topRate: 0,
  incomeAtTopRate: 0,
  taxAtTopRate: 0,
  lowerRate: 0,
  incomeAtLowerRate: 0,
  taxAtLowerRate: 0,
  totalTax: 0,
  amountLeftOver: 0,
};

export function getTopShavingTaxNaive(
  income: number,
  shaving: number
): { taxOnShaving: number; amountRemaining: number; rate: number } {
  const bracket = getTopTaxBracket(income);
  const rate = RATES[bracket];

  return {
    taxOnShaving: shaving * rate,
    amountRemaining: shaving - shaving * rate,
    rate,
  };
}

function getTopTaxBracket(income: number) {
  if (income < 18201) return 0;
  if (income >= 18201 && income < 45001) return 1;
  if (income >= 45001 && income < 120001) return 2;
  if (income >= 120001 && income < 180001) return 3;
  if (income >= 180001) return 4;
  return 0;
}

export const debounce = (callback: any, wait: number) => {
  let timeoutId: any = null;

  console.log("debounce");
  return (...args: any[]) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};

// export function getTopShavingTax(
//   income: number,
//   shaving: number
// ): IncomeTaxShave {
//   //   if (income < 0) throw new Error("arg must be positive");
//   //   if (shaving < 0) throw new Error("arg must be positive");

//   let bracket = 0;
//   let topRate = 0;
//   let spaceInBracket = 0;
//   let incomeAtTopRate = 0;
//   let taxAtTopRate = 0;
//   let lowerRate = 0;
//   let incomeAtLowerRate = 0;
//   let taxAtLowerRate = 0;

//   if (income < 18201) {
//     bracket = 1;
//     topRate = 0;
//     spaceInBracket = income - 0;

//     if (shaving > spaceInBracket) {
//       incomeAtTopRate = spaceInBracket;
//       incomeAtLowerRate = shaving - spaceInBracket;
//       taxAtTopRate = incomeAtTopRate * topRate;
//       lowerRate = 0;
//       taxAtLowerRate = incomeAtLowerRate * lowerRate;
//     }
//   } else if (income >= 18201 && income < 45001) {
//     bracket = 2;
//     topRate = 0.19;
//     spaceInBracket = income - 18201;

//     if (shaving > spaceInBracket) {
//       incomeAtTopRate = spaceInBracket;
//       incomeAtLowerRate = shaving - spaceInBracket;
//       taxAtTopRate = incomeAtTopRate * topRate;
//       lowerRate = 0;
//       taxAtLowerRate = incomeAtLowerRate * lowerRate;
//     }
//   } else if (income >= 45001 && income < 120001) {
//     bracket = 3;
//     topRate = 0.325;
//     spaceInBracket = income - 45001;

//     if (shaving > spaceInBracket) {
//       incomeAtTopRate = spaceInBracket;
//       incomeAtLowerRate = shaving - spaceInBracket;
//       taxAtTopRate = incomeAtTopRate * topRate;
//       lowerRate = 0.19;
//       taxAtLowerRate = incomeAtLowerRate * lowerRate;
//     }
//   } else if (income >= 120001 && income < 180001) {
//     bracket = 4;
//     topRate = 0.37;
//     spaceInBracket = income - 120001;

//     if (shaving > spaceInBracket) {
//       incomeAtTopRate = spaceInBracket;
//       incomeAtLowerRate = shaving - spaceInBracket;
//       taxAtTopRate = incomeAtTopRate * topRate;
//       lowerRate = 0.325;
//       taxAtLowerRate = incomeAtLowerRate * lowerRate;
//     }
//   } else {
//     bracket = 5;
//     topRate = 0.45;
//     spaceInBracket = income - 180001;
//     if (shaving > spaceInBracket) {
//       incomeAtTopRate = spaceInBracket;
//       incomeAtLowerRate = shaving - spaceInBracket;
//       taxAtTopRate = incomeAtTopRate * topRate;
//       lowerRate = 0.37;
//       taxAtLowerRate = incomeAtLowerRate * lowerRate;
//     }
//   }

//   return {
//     topRate,
//     incomeAtTopRate,
//     taxAtTopRate,
//     lowerRate,
//     incomeAtLowerRate,
//     taxAtLowerRate,
//     totalTax: taxAtTopRate + taxAtLowerRate,
//     amountLeftOver: shaving - (taxAtTopRate + taxAtLowerRate),
//   };
// }
