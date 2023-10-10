"use client";

import { Chart } from "@/components/Chart/Chart";
import { ConcessionalCap } from "@/components/ConcessionalCap/ConcessionalCap";
import { useState } from "react";
import styles from "./page.module.css";
import { getTopShavingTaxNaive, mockShaving, taxBucket } from "./utilities";

const SG_RATE = 0.11; //11% for 2023/24, increasing to 11.5% next fin year.
const CONTRIBUTIONS_TAX_RATE = 0.15;
const MEDICARE_LEVY_RATE = 0.02;

export default function Home() {
  const [statedIncome, setStatedIncome] = useState(0);
  const [salSacPerMonth, setSalSacPerMonth] = useState(0);
  const [includesSuper, setIncludesSuper] = useState(true);
  const [incSalSac, setIncSalSac] = useState(true);
  const [shavingBit, setShavingBit] = useState(mockShaving);

  const [maxYAxis, setMaxYAxis] = useState(-1);

  const adjustedForIncSuperIncome = includesSuper
    ? statedIncome
    : statedIncome * (1 + SG_RATE);

  // 1. medicare levy comes out first. Calculated on gross income.
  const medicareLevy = adjustedForIncSuperIncome * MEDICARE_LEVY_RATE;
  const salMinusMedicare = adjustedForIncSuperIncome - medicareLevy;

  // 2. SG comes out at same time as medicare. Calculated on gross income. //TODO: link?
  const superNetSG = adjustedForIncSuperIncome * SG_RATE;
  const superTaxOnSG = superNetSG * CONTRIBUTIONS_TAX_RATE;
  const superInAccount = superNetSG - superTaxOnSG;

  const salMinusSGAndMedicare = salMinusMedicare - superNetSG;

  // 3. Sal sac comes out after levy + SG are deducted. TODO: link.
  const superTaxOnSalSac = salSacPerMonth * CONTRIBUTIONS_TAX_RATE;
  const salSacInAccount = salSacPerMonth - superTaxOnSalSac;

  // 4. Remaining salary taxed in income tax brackets.
  const incomeAfterSGAndLevy =
    adjustedForIncSuperIncome - superNetSG - medicareLevy;

  const incomeAfterSGLevyAndSalSac = incomeAfterSGAndLevy - salSacPerMonth;

  const concessionalContributions = superNetSG + salSacPerMonth * 12;
  // const shavingBit = getTopShavingTax(incomeAfterSuperAndLevy, salSacPerMonth);
  // useEffect(() => {
  //   setShavingBit(getTopShavingTax(incomeAfterSuperAndLevy, salSacPerMonth));
  // }, [incomeAfterSuperAndLevy, salSacPerMonth]);

  // 5 income tax brackets with sal sac
  const taxBucket1 = taxBucket(incomeAfterSGLevyAndSalSac, 0, 18200, 0);
  const taxBucket2 = taxBucket(incomeAfterSGLevyAndSalSac, 18201, 45000, 19);
  const taxBucket3 = taxBucket(incomeAfterSGLevyAndSalSac, 45001, 120000, 32.5);
  const taxBucket4 = taxBucket(incomeAfterSGLevyAndSalSac, 120001, 180000, 37);
  const taxBucket5 = taxBucket(
    incomeAfterSGLevyAndSalSac,
    180001,
    Infinity,
    45
  );

  // 5 income tax brackets WITHOUT sal sac
  const noSacTaxBucket1 = taxBucket(salMinusSGAndMedicare, 0, 18200, 0);
  const noSacTaxBucket2 = taxBucket(salMinusSGAndMedicare, 18201, 45000, 19);
  const noSacTaxBucket3 = taxBucket(salMinusSGAndMedicare, 45001, 120000, 32.5);
  const noSacTaxBucket4 = taxBucket(salMinusSGAndMedicare, 120001, 180000, 37);
  const noSacTaxBucket5 = taxBucket(
    salMinusSGAndMedicare,
    180001,
    Infinity,
    45
  );

  // Chart data
  // ML, SG, SSac, 1, 2, 3, 4, 5
  const bucketIncomes = [
    0,
    superInAccount,
    salSacInAccount,
    taxBucket1.remIncome,
    taxBucket2.remIncome,
    taxBucket3.remIncome,
    taxBucket4.remIncome,
    taxBucket5.remIncome,
  ];
  const bucketTaxes = [
    medicareLevy,
    superTaxOnSG,
    superTaxOnSalSac,
    taxBucket1.taxPaid,
    taxBucket2.taxPaid,
    taxBucket3.taxPaid,
    taxBucket4.taxPaid,
    taxBucket5.taxPaid,
  ];

  const bucketIncomesWithoutSalSac = [
    0,
    superInAccount,
    0,
    noSacTaxBucket1.remIncome,
    noSacTaxBucket2.remIncome,
    noSacTaxBucket3.remIncome,
    noSacTaxBucket4.remIncome,
    noSacTaxBucket5.remIncome,
  ];
  const bucketTaxesWithoutSalSac = [
    medicareLevy,
    superTaxOnSG,
    0,
    noSacTaxBucket1.taxPaid,
    noSacTaxBucket2.taxPaid,
    noSacTaxBucket3.taxPaid,
    noSacTaxBucket4.taxPaid,
    noSacTaxBucket5.taxPaid,
  ];

  const totalTax =
    medicareLevy +
    superTaxOnSG +
    superTaxOnSalSac +
    taxBucket1.taxPaid +
    taxBucket2.taxPaid +
    taxBucket3.taxPaid +
    taxBucket4.taxPaid +
    taxBucket5.taxPaid;

  const ifSalSacWasIncomeAmount = getTopShavingTaxNaive(
    incomeAfterSGAndLevy,
    salSacPerMonth
  ).amountRemaining;

  const salSacSavings = salSacInAccount - ifSalSacWasIncomeAmount;

  return (
    // <div className={styles.main}>
    <div>
      <div>
        <Chart
          bucketIncomes={incSalSac ? bucketIncomes : bucketIncomesWithoutSalSac}
          bucketTaxes={incSalSac ? bucketTaxes : bucketTaxesWithoutSalSac}
        ></Chart>
        <div>
          <label htmlFor="incSalSac">include salary sacrifice in chart?</label>
          <input
            type="checkbox"
            title="incSalSac"
            checked={incSalSac}
            onChange={() => setIncSalSac((prev) => !prev)}
          />
        </div>

        <ConcessionalCap sg={superNetSG} salSacPerMonth={salSacPerMonth} />
      </div>

      <h1>Salary Sacrifice</h1>
      {/* 
      <div>
        <h2>shaving bit</h2>
      </div> */}
      <div>{`before tax salary: ${adjustedForIncSuperIncome}`}</div>
      {/* <div>{`total tax no sal sac: ${}`}</div>
      <div>{`total tax with sal sac; ${}`}</div> */}

      <div className={styles.inputBlock}>
        <label htmlFor="income">annual income</label>
        <input
          type="number"
          title="income"
          value={statedIncome}
          onChange={(event) => setStatedIncome(parseInt(event.target.value))}
        />

        <label htmlFor="salsac">salary sacrifice</label>
        <input
          type="number"
          title="salsac"
          value={salSacPerMonth}
          onChange={(event) => setSalSacPerMonth(parseInt(event.target.value))}
        />

        {/* <label htmlFor="incSuper">income includes Super?</label>
        <input
          type="checkbox"
          title="incSuper"
          checked={includesSuper}
          onChange={() => setIncludesSuper((prev) => !prev)}
        /> */}
      </div>

      <div className={styles.summaryBlock}>
        <p>{`${salSacPerMonth} pre-tax income per month becomes:`}</p>
        <p>{`in bank account: ${ifSalSacWasIncomeAmount} - tax: ${
          getTopShavingTaxNaive(incomeAfterSGAndLevy, salSacPerMonth)
            .taxOnShaving
        } - rate: ${
          getTopShavingTaxNaive(incomeAfterSGLevyAndSalSac, salSacPerMonth).rate
        }`}</p>
        <p>{`in super fund: ${salSacInAccount} - tax: ${superTaxOnSalSac} - rate: ${CONTRIBUTIONS_TAX_RATE}`}</p>

        <p>{`Diff: ${salSacSavings}`}</p>
        <p>{`Per Year: ${salSacSavings * 12}`}</p>
        {/* <p>{`percentage increase of take home pay: ${}`}</p> */}

        {/* <p>{`adj income: ${121000}`}</p>
        <p>{`top bracket: chunk: ${shavingBit.incomeAtTopRate} - rate:${shavingBit.topRate} - tax: ${shavingBit.taxAtTopRate}`}</p>
        <p>{`next bracket: chunk: ${shavingBit.incomeAtLowerRate} - rate:${shavingBit.lowerRate} - tax: ${shavingBit.taxAtLowerRate}`}</p>
        <p>{`$ in bank account: ${shavingBit.amountLeftOver.toFixed(2)}`}</p>
        <p>{`total tax: ${shavingBit.totalTax.toFixed(2)}`}</p> */}
        {/* <p>{`: ${}`}</p> */}
        {/* <p>{`: ${}`}</p> */}
      </div>
      <div>{`total tax paid: ${totalTax.toFixed(2)} : ${
        (totalTax / adjustedForIncSuperIncome) * 100
      }`}</div>
      <div>
        <h2>Super</h2>
        <div>SG: {superNetSG}</div>
        <div>Tax: {superTaxOnSG}</div>
      </div>

      <div>
        <div>
          <h2>{`bucket 0: medicareLevy + SG + SalSac`}</h2>
          <p>{`medicare levy: ${medicareLevy.toFixed(2)}`}</p>
          <p>{`SG:  ${superNetSG} - SG tax: ${superTaxOnSG.toFixed(2)}`}</p>
          <p>{`Sal Sac: ${salSacPerMonth} - SalSac tax: ${superTaxOnSalSac}`}</p>
          <p>{`subtotal tax: ${
            medicareLevy + superTaxOnSG + superTaxOnSalSac
          }`}</p>
          <p>{`rem income: ${incomeAfterSGLevyAndSalSac}`}</p>
        </div>

        <div>
          <h2>{`bucket 1: ${taxBucket1.bucketMin} - ${taxBucket1.bucketMax}: ${taxBucket1.taxRate}`}</h2>
          <div>{`capacity ${taxBucket1.bucketCapacity}`}</div>
          <div>{`tax ${taxBucket1.taxPaid}`}</div>
          <div>{`take home ${taxBucket1.remIncome}`}</div>
        </div>

        <div>
          <h2>{`bucket 2: ${taxBucket2.bucketMin} - ${taxBucket2.bucketMax}: ${taxBucket2.taxRate}`}</h2>
          <div>{`capacity ${taxBucket2.bucketCapacity}`}</div>
          <div>{`tax ${taxBucket2.taxPaid}`}</div>
          <div>{`take home ${taxBucket2.remIncome}`}</div>
        </div>

        <div>
          <h2>{`bucket 3: ${taxBucket3.bucketMin} - ${taxBucket3.bucketMax}: ${taxBucket3.taxRate}`}</h2>
          <div>{`capacity ${taxBucket3.bucketCapacity}`}</div>
          <div>{`tax ${taxBucket3.taxPaid}`}</div>
          <div>{`take home ${taxBucket3.remIncome}`}</div>
        </div>

        <div>
          <h2>{`bucket 4: ${taxBucket4.bucketMin} - ${taxBucket4.bucketMax}: ${taxBucket4.taxRate}`}</h2>
          <div>{`capacity ${taxBucket4.bucketCapacity}`}</div>
          <div>{`tax ${taxBucket4.taxPaid}`}</div>
          <div>{`take home ${taxBucket4.remIncome}`}</div>
        </div>

        <div>
          <h2>{`bucket 5: ${taxBucket5.bucketMin} - ${taxBucket5.bucketMax}: ${taxBucket5.taxRate}`}</h2>
          <div>{`capacity ${taxBucket5.bucketCapacity}`}</div>
          <div>{`tax ${taxBucket5.taxPaid}`}</div>
          <div>{`take home ${taxBucket5.remIncome}`}</div>
        </div>
      </div>
    </div>
  );
}
