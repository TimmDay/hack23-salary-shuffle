"use client";

import { Chart } from "@/components/Chart/Chart";
import { CompoundedGrid } from "@/components/CompoundedGrid/CompoundedGrid";
import { InputBlock } from "@/components/InputBlock/InputBlock";
import { SavingsSummary } from "@/components/SavingsSummary/SavingsSummary";
import { ToggleSalSac } from "@/components/ToggleSalSac/ToggleSalSac";
import { useState } from "react";
import {
  CONTRIBUTIONS_TAX_RATE,
  calcCompoundInterest,
  formatCurrency,
  mockShaving,
  taxBucket,
} from "../utilities/utilities";
import styles from "./page.module.css";

const SG_RATE = 0.11; //11% for 2023/24, increasing to 11.5% 2024/25, then 12% 2025/26.
const MEDICARE_LEVY_RATE = 0.02;

export default function Home() {
  const [statedIncome, setStatedIncome] = useState(0);
  const [salSacPerMonth, setSalSacPerMonth] = useState(0);
  const [includesSuper, setIncludesSuper] = useState(true);
  const [incSalSac, setIncSalSac] = useState(true);
  const [maxYAxis, setMaxYAxis] = useState(80000);

  const [shavingBit, setShavingBit] = useState(mockShaving);

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
  const incomeAfterSGLevyAndSalSac =
    salMinusSGAndMedicare - salSacPerMonth * 12;

  const concessionalContributions = superNetSG + salSacPerMonth * 12;
  // const shavingBit = getTopShavingTax(incomeAfterSuperAndLevy, salSacPerMonth);
  // useEffect(() => {
  //   setShavingBit(getTopShavingTax(incomeAfterSuperAndLevy, salSacPerMonth));
  // }, [incomeAfterSuperAndLevy, salSacPerMonth]);

  // 5 income tax brackets WITH sal sac
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
  const bucketIncomesWithSalSac = [
    0,
    superInAccount,
    salSacInAccount * 12,
    taxBucket1.remIncome,
    taxBucket2.remIncome,
    taxBucket3.remIncome,
    taxBucket4.remIncome,
    taxBucket5.remIncome,
  ];
  const bucketTaxesWithSalSac = [
    medicareLevy,
    superTaxOnSG,
    superTaxOnSalSac * 12,
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

  const totalTaxWithSalSac =
    medicareLevy +
    superTaxOnSG +
    superTaxOnSalSac +
    taxBucket1.taxPaid +
    taxBucket2.taxPaid +
    taxBucket3.taxPaid +
    taxBucket4.taxPaid +
    taxBucket5.taxPaid;
  const afterTaxIncomeWithSalSac =
    adjustedForIncSuperIncome - totalTaxWithSalSac;

  const totalTaxWithNoSalSac =
    medicareLevy +
    superTaxOnSG +
    0 +
    noSacTaxBucket1.taxPaid +
    noSacTaxBucket2.taxPaid +
    noSacTaxBucket3.taxPaid +
    noSacTaxBucket4.taxPaid +
    noSacTaxBucket5.taxPaid;

  const afterTaxIncomeNoSalSac =
    adjustedForIncSuperIncome - totalTaxWithNoSalSac;

  const totalTax = incSalSac ? totalTaxWithSalSac : totalTaxWithNoSalSac;
  const totalAfterTaxSal = incSalSac
    ? afterTaxIncomeWithSalSac
    : afterTaxIncomeNoSalSac;

  const renderCompoundTable =
    statedIncome !== 0 &&
    statedIncome &&
    salSacPerMonth !== 0 &&
    salSacPerMonth;

  return (
    <div>
      <InputBlock
        setIncome={setStatedIncome}
        income={statedIncome}
        setSalSac={setSalSacPerMonth}
        salsac={salSacPerMonth}
        setYAxis={setMaxYAxis}
        superNetSG={superNetSG}
      />

      <div className={styles.results}>
        <div>
          <ToggleSalSac incSalSac={incSalSac} setIncSalSac={setIncSalSac} />
          <Chart
            bucketIncomes={
              incSalSac ? bucketIncomesWithSalSac : bucketIncomesWithoutSalSac
            }
            bucketTaxes={
              incSalSac ? bucketTaxesWithSalSac : bucketTaxesWithoutSalSac
            }
            yAxisMax={maxYAxis}
          />
          <div className={styles.totals}>
            <span className={styles.cuteLabel}>Total annual tax:</span>
            <span className={styles.red}>{` $${totalTax}`}</span>
          </div>
          <div className={styles.totals}>
            <span className={styles.cuteLabel}>
              Total remuneration after tax:
            </span>
            <span className={styles.green}>{` ${formatCurrency(
              totalAfterTaxSal
            )}`}</span>
          </div>
        </div>
        <SavingsSummary
          salSacPerMonth={salSacPerMonth}
          salMinusSGAndMedicare={salMinusSGAndMedicare}
          incSalSac={incSalSac}
        />
      </div>

      {statedIncome !== 0 && statedIncome ? (
        <section className={styles.compoundSection}>
          <h2 id="compound-table">
            Compounding Totals for various potential rates of return
          </h2>

          {/* <label htmlFor="incSuper">income includes Super?</label>
        <input
        type="checkbox"
        title="incSuper"
        checked={includesSuper}
        onChange={() => setIncludesSuper((prev) => !prev)}
      /> */}

          <div className={styles.summaryBlock}>
            <CompoundedGrid amount={salSacInAccount * 12} />

            <div className={styles.summaryNote}>
              <div>{`compounded at 6% for 30 years $${calcCompoundInterest(
                0,
                6,
                30,
                salSacInAccount * 12
              )}`}</div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
