import { BucketResults } from "./types";

// https://www.ato.gov.au/Rates/Tax-rates---Australian-residents/
/** INCOME TAX BRACKETS 
    0. 0, 18200, 0
    1. 18201, 45000, 19
    2. 45001, 120000, 32.5
    3. 120001, 180000, 37
    4. 180001, Infinity, 45
*/
export const CONTRIBUTIONS_TAX_RATE = 0.15;

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

export type ChunkTopIncome = {
  totalTax: number;
  amountAfterTax: number;
  sliceTop: number;
  rateTop: number;
  taxTop: number;
  sliceUnder: number;
  rateUnder: number;
  taxUnder: number;
};
export function getTopShavingTaxMultiBracket(
  income: number,
  shaving: number
): ChunkTopIncome {
  const bracket = getTopTaxBracket(income);
  const topRate = RATES[bracket];
  const inTopTaxBracket = amountInTopTaxBracket(income);

  const rateBracketBelow = RATES[bracket ? bracket - 1 : bracket];

  let shavingTop = shaving,
    shavingLower = 0;

  if (shaving > inTopTaxBracket) {
    shavingTop = inTopTaxBracket;
    shavingLower = shaving - inTopTaxBracket;
  }

  const taxShavingTop = shavingTop * topRate;
  const taxShavingLower = shavingLower * rateBracketBelow;
  const totalShavingTax = taxShavingTop + taxShavingLower;

  return {
    totalTax: totalShavingTax,
    amountAfterTax: shaving - totalShavingTax,
    rateTop: topRate,
    rateUnder: rateBracketBelow,
    taxTop: taxShavingTop,
    taxUnder: taxShavingLower,
    sliceTop: shavingTop,
    sliceUnder: shavingLower,
  };
}

export function getTopIncomeBracketRate(income: number) {
  const bracket = getTopTaxBracket(income);
  return RATES[bracket];
}
function getTopTaxBracket(income: number) {
  if (income < 18201) return 0;
  if (income >= 18201 && income < 45001) return 1;
  if (income >= 45001 && income < 120001) return 2;
  if (income >= 120001 && income < 180001) return 3;
  if (income >= 180001) return 4;
  return 0;
}

function amountInTopTaxBracket(income: number): number {
  if (income < 18201) return income;
  if (income >= 18201 && income < 45001) return income - 18201;
  if (income >= 45001 && income < 120001) return income - 45001;
  if (income >= 120001 && income < 180001) return income - 120001;
  // if (income >= 180001)
  return income - 180001;
}

//https://math.stackexchange.com/questions/1698578/compound-interest-formula-adding-annual-contributions
// P - initial amount
// i - annual interest rate
// A - yearly contribution or deposit added
// n - years
// const result = principal * (1 + interestRate / 100) ** years;
export function calcCompoundInterest(
  P: number,
  i: number,
  n: number,
  A: number
): string {
  // if (P === 0) P = 1; // free dollar congrats
  i = i / 100;
  const result = (P + A / i) * Math.pow(1 + i, n) - A / i;
  return formatCurrency(result);
}

export function debounce(callback: any, wait: number) {
  let timeoutId: any = null;
  return (...args: any[]) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

export function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
