"use client";

import { useState } from "react";

const SG_RATE = 0.11; //11% for 2023/24, increasing to 11.5% next fin year.
const CONTRIBUTIONS_TAX_RATE = 0.15;

export default function Home() {
  const [statedIncome, setStatedIncome] = useState(0);
  const [salSacPerMonth, setSalSacPerMonth] = useState(0);
  const [includesSuper, setIncludesSuper] = useState(false);

  const superAdjustedIncome = includesSuper
    ? statedIncome
    : statedIncome * (1 + SG_RATE);
  const superNetSG = superAdjustedIncome * SG_RATE;
  const superTaxOnSG = superNetSG * CONTRIBUTIONS_TAX_RATE;

  const superTaxOnSalSac = salSacPerMonth * CONTRIBUTIONS_TAX_RATE;

  // const totalTax = superTaxOnSG + superTaxOnSalSac

  return (
    // <div className={styles.main}>
    <div>
      <h1>Salary Sacrifice</h1>

      <div>some stuff</div>

      <div>
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

        <label htmlFor="incSuper">income includes Super?</label>
        <input
          type="checkbox"
          title="incSuper"
          checked={includesSuper}
          onChange={() => setIncludesSuper((prev) => !prev)}
        />
      </div>

      <div>
        <h2>Super</h2>
        <div>SG: {superNetSG}</div>
        <div>Tax: {superTaxOnSG}</div>
      </div>
    </div>
  );
}
