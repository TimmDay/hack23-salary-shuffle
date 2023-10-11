import {
  CONTRIBUTIONS_TAX_RATE,
  getTopShavingTaxNaive,
} from "@/utilities/utilities";

import Link from "next/link";
import { InfoTippy } from "../Tippy/InfoTippy";
import styles from "./SavingsSummary.module.css";

type Props = {
  salSacPerMonth: number;
  incSalSac: boolean;
  salMinusSGAndMedicare: number;
};

export function SavingsSummary({
  incSalSac,
  salSacPerMonth,
  salMinusSGAndMedicare,
}: Props) {
  const chunkAsNormalIncome = getTopShavingTaxNaive(
    salMinusSGAndMedicare,
    salSacPerMonth
  );
  const chunkIncomeTax = chunkAsNormalIncome.taxOnShaving;
  const chunkAfterTax = chunkAsNormalIncome.amountRemaining;

  const salSacConcessionalTax = salSacPerMonth * CONTRIBUTIONS_TAX_RATE;
  const salSacAfterTax = salSacPerMonth - salSacConcessionalTax;

  const savingsBySalSac = salSacAfterTax - chunkAfterTax;
  const annualSavings = 12 * savingsBySalSac;

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapChunk}>
        <h3
          className={styles.header}
        >{`$${salSacPerMonth} of pre-tax income turns into either:`}</h3>
        <div className={styles.contentChunk}>
          <div className={styles.containingTip}>
            <div>{`$${chunkAfterTax} in your bank account, or`}</div>
            {/* TODO: tippy showing income marginal tax rate * chunk */}
            <Tippy />
          </div>
          <div className={styles.containingTip}>
            <div>{`$${salSacAfterTax} in your super fund`}</div>
            {/* TODO: tippy showing concessional tax rate * chunk */}
            <Tippy />
          </div>
          <div>{`(An increase of $${savingsBySalSac.toFixed(
            2
          )} of after-tax monthly income)`}</div>
          <div>{`That's $${annualSavings.toFixed(
            2
          )} per year in extra after-tax income.`}</div>

          <div>{`Or an effective ${annualSavings.toFixed(
            2
          )}% increase in annual tax salary.`}</div>

          <div>{`Total Salary Sac contributions annual are: ${annualSavings.toFixed(
            2
          )}% increase in annual tax salary.`}</div>

          {/* tippy with compounded graph */}
          <div className={styles.containingTip}>
            <div>{`Compounded over decades?`}</div>
            <Tippy />
          </div>
        </div>
      </div>

      <p>{`Total Tax Paid with${
        incSalSac ? "" : "OUT"
      } salary sacrifice: ${1234}`}</p>
      <p>{`After Tax income: ${12342134}`}</p>
    </div>
  );
}

function Tippy() {
  return (
    <InfoTippy iconId="alert-circle">
      <div className={styles.tipContent}>
        <div>{`Assumptions:`}</div>
        <div>{`Annual Salary includes super`}</div>
        <div>{`You are not paying the medicare levy surcharge`}</div>

        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.ato.gov.au/Individuals/Medicare-and-private-health-insurance/Medicare-levy-surcharge/Paying-the-medicare-levy-surcharge/"
        >
          ATO: Medicare Levy Surcharge
        </Link>
      </div>
    </InfoTippy>
  );
}
