export type IncomeTaxShave = {
  topRate: number;
  incomeAtTopRate: number;
  taxAtTopRate: number;
  lowerRate: number;
  incomeAtLowerRate: number;
  taxAtLowerRate: number;
  totalTax: number;
  amountLeftOver: number;
};

export type BucketResults = {
  taxPaid: number;
  remIncome: number;
  bucketCapacity: number;
  bucketMin: number;
  bucketMax: number;
  taxRate: number;
};
