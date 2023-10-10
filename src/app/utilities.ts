// https://www.ato.gov.au/Rates/Tax-rates---Australian-residents/

/** INCOME TAX BRACKETS 
    1. 0, 18200, 0
    2. 18201, 45000, 19
    3. 45001, 120000, 32.5
    4. 120001, 180000, 37
    5. 180001, Infinity, 45
*/
const RATES = [0, 0.19, 0.325, 0.37, 0.45];

// Calculate the numbers needed to plot the chart.
type BucketResults = {
  taxPaid: number;
  remIncome: number;
  bucketCapacity: number;
  bucketMin: number;
  bucketMax: number;
  taxRate: number;
};

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

type IncomeTaxShave = {
  topRate: number;
  incomeAtTopRate: number;
  taxAtTopRate: number;
  lowerRate: number;
  incomeAtLowerRate: number;
  taxAtLowerRate: number;
  totalTax: number;
  amountLeftOver: number;
};

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
  const bracket = getTaxBracket(income);
  const rate = RATES[bracket];

  return {
    taxOnShaving: shaving * rate,
    amountRemaining: shaving - shaving * rate,
    rate,
  };
}

function getTaxBracket(income: number) {
  if (income < 18201) return 0;
  if (income >= 18201 && income < 45001) return 1;
  if (income >= 45001 && income < 120001) return 2;
  if (income >= 120001 && income < 180001) return 3;
  if (income >= 180001) return 4;
  return 0;
}
