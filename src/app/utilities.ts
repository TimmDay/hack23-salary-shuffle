// Calculate the numbers needed to plot the chart.
type BucketResults = {
  taxPaid: number;
  remIncome: number;
  bucketCapacity: number;
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

  return { taxPaid, remIncome, bucketCapacity };
}
