import {
  CONTRIBUTIONS_TAX_RATE,
  ChunkTopIncome,
  formatCurrency,
  getTopIncomeBracketRate,
  getTopShavingTaxMultiBracket,
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
  const chunkAsNormalIncome = getTopShavingTaxMultiBracket(
    salMinusSGAndMedicare,
    salSacPerMonth
  );

  const chunkIncomeTax = chunkAsNormalIncome.totalTax;
  const chunkAfterTax = chunkAsNormalIncome.amountAfterTax;

  const topIncomeTaxBracketRate = getTopIncomeBracketRate(
    salMinusSGAndMedicare
  );

  const salSacConcessionalTax = salSacPerMonth * CONTRIBUTIONS_TAX_RATE;
  const salSacAfterTax = salSacPerMonth - salSacConcessionalTax;
  const salSacAfterTaxAnnual = 12 * salSacAfterTax;

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
            <p className={styles.compare}>
              {`${formatCurrency(
                chunkAfterTax
              )} if you didn't salary sacrifice 🤷`}
            </p>
            {chunkAsNormalIncome && <TippyIncome data={chunkAsNormalIncome} />}
          </div>
          <p className={styles.indent}>OR</p>
          <div className={styles.containingTip}>
            <p className={styles.compare}>
              {`${formatCurrency(salSacAfterTax)} in your super fund 💰`}
            </p>
            <TippySalSac
              rate={CONTRIBUTIONS_TAX_RATE}
              salsac={salSacPerMonth}
            />
          </div>

          <h4 className={styles.head4}>THE BENEFITS OF SALARY SACRIFICE</h4>
          <p>
            {`A ${formatCurrency(savingsBySalSac)} tax saving per month  🤩`}
          </p>
          <div>{`(That's ${formatCurrency(annualSavings)} / year) 🤩🤩`}</div>

          <div className={styles.containingTip}>
            <div>
              {`That's ${formatCurrency(
                salSacAfterTaxAnnual
              )} extra annual savings in your super.`}
            </div>
            <TippyAnnualSalSac salsac={salSacPerMonth} />
          </div>

          <div className={styles.containingTip}>
            <div>
              {`How might ${formatCurrency(
                salSacAfterTaxAnnual
              )} compound over decades?`}
            </div>
            <TippyCompound />
          </div>

          <div className={styles.containingTip}>
            <div>{`What's the catch?`}</div>
            <TippyPreservationAge
              rate={CONTRIBUTIONS_TAX_RATE}
              salsac={salSacPerMonth}
            />
          </div>

          <div className={styles.containingTip}>
            <div>{`What's the catch of the catch (FHSS)?`}</div>
            <TippyFHSS rate={CONTRIBUTIONS_TAX_RATE} salsac={salSacPerMonth} />
          </div>
        </div>
      </div>
    </div>
  );
}

type Chunk = { data: ChunkTopIncome };
function TippyIncome({ data }: Chunk) {
  const {
    sliceTop,
    rateTop,
    taxTop,
    sliceUnder,
    rateUnder,
    taxUnder,
    totalTax,
    amountAfterTax,
  } = data;
  const isSingleBracket = sliceUnder === 0;
  const salsac = sliceTop + sliceUnder;

  const SingleBracket = isSingleBracket && (
    <div>
      {`${formatCurrency(salsac)} taxed at your top income tax bracket of ${
        rateTop * 100
      }% is reduced by ${formatCurrency(taxTop)} of tax to ${formatCurrency(
        amountAfterTax
      )}`}
    </div>
  );

  const MultiBracket = !isSingleBracket && (
    <div className={styles.tipContent}>
      <div>
        {`At your income a chunk of ${formatCurrency(
          salsac
        )} would span your top two income tax brackets.`}
      </div>
      <div>
        {`${formatCurrency(sliceTop)} of it is taxed at ${
          rateTop * 100
        }% and ${formatCurrency(sliceUnder)} of it is taxed at ${
          rateUnder * 100
        }%`}
      </div>
      <div>
        {`So ${salsac} is reduced by a total of ${formatCurrency(
          totalTax
        )} tax to ${formatCurrency(amountAfterTax)}`}
      </div>
    </div>
  );

  return (
    <InfoTippy iconId="alert-circle">
      <div className={styles.tipContent}>
        {isSingleBracket ? SingleBracket : MultiBracket}
      </div>
    </InfoTippy>
  );
}

function TippySalSac({ rate, salsac }: { rate: number; salsac: number }) {
  const tax = salsac * rate;
  const afterTax = salsac - tax;

  return (
    <InfoTippy iconId="alert-circle">
      <div className={styles.tipContent}>
        <div>{`$${salsac} taxed at the concessional tax rate of ${
          rate * 100
        }% is reduced by ${formatCurrency(tax)} of tax to $${formatCurrency(
          afterTax
        )}`}</div>
      </div>
    </InfoTippy>
  );
}

function TippyCompound() {
  return (
    <InfoTippy iconId="alert-triangle" placement="left">
      <div className={styles.tipContent}>
        <p>Warning: contains opinions</p>
        <p>
          Rates of return of markets are uncertain and depend on your investment
          mix (however tax savings are certain and instant). Treat this section
          as guesstimate only.
        </p>
        <a href="#compound-table">See a table</a>

        <p>You can check my math here</p>
        <div>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.bankrate.com/banking/savings/compound-savings-calculator/"
          >
            Bankrate: compound interest calculator
          </Link>
        </div>
      </div>
    </InfoTippy>
  );
}

function TippyPreservationAge({
  rate,
  salsac,
}: {
  rate: number;
  salsac: number;
}) {
  const tax = salsac * rate;
  const afterTax = salsac - tax;

  return (
    <InfoTippy iconId="alert-circle">
      <div className={styles.tipContent}>
        <div>{`You cannot access your superannuation fund until you reach preservation age (or on compassionate grounds, or use the FHSS).`}</div>

        <div>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.ato.gov.au/Individuals/Jobs-and-employment-types/Working-as-an-employee/Leaving-the-workforce/Accessing-your-super-to-retire/#:~:text=Preservation%20age,-Your%20preservation%20age&text=If%20you%20are%2060%20years,a%20super%20lump%20sum"
          >
            ATO: Preservation Age
          </Link>
        </div>

        <div>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.ato.gov.au/individuals/super/withdrawing-and-using-your-super/early-access-to-super/when-you-can-access-your-super-early/#:~:text=You%20may%20be%20allowed%20to,arising%20from%20a%20severe%20disability"
          >
            ATO: Early Super Withdrawal
          </Link>
        </div>
      </div>
    </InfoTippy>
  );
}

function TippyFHSS({ rate, salsac }: { rate: number; salsac: number }) {
  const tax = salsac * rate;
  const afterTax = salsac - tax;

  return (
    <InfoTippy iconId="alert-circle">
      <div className={styles.tipContent}>
        <div>{`The First Home Buyer Scheme is a way to save a deposit for your first home with reduced-tax earnings in a tax-free environment - so you'll get there faster.`}</div>
        <div>
          - Only Voluntary or Salary Sacrifice Contributions count towards it
          (not the super guarantee that work pays automatically)
        </div>
        <div>
          - You can only withdraw up to 15K of voluntary contributions from a
          given fin year.
        </div>
        <div>
          - You can withdraw up to a max of 50k (so it would take you at least 4
          years of heavy salary sacrificing to get to the max benefit).
        </div>
        <div>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.ato.gov.au/Individuals/Super/Withdrawing-and-using-your-super/First-Home-Super-Saver-Scheme/#Howyoucansaveinsuper"
          >
            ATO: First Home Super Saver Scheme
          </Link>
        </div>
      </div>
    </InfoTippy>
  );
}

function TippyAnnualSalSac({ salsac }: { salsac: number }) {
  const annualSalSac = salsac * 12;
  const annualSalSacTax = annualSalSac * CONTRIBUTIONS_TAX_RATE;
  const annualSalSacMinusTax = annualSalSac - annualSalSacTax;

  return (
    <InfoTippy iconId="alert-circle">
      <div className={styles.tipContent}>
        <div>
          {`Total Salary Sacrifice Contributions are ${formatCurrency(
            salsac
          )} * 12 months = ${formatCurrency(annualSalSac)} annually`}
        </div>
        <div>
          {`Contributions tax on that is ${
            CONTRIBUTIONS_TAX_RATE * 100
          }%: ${formatCurrency(annualSalSacTax)}`}
        </div>
        <div>
          {`Additional contributions due to Salary Sacrifice total: ${formatCurrency(
            annualSalSacMinusTax
          )}`}
        </div>
      </div>
    </InfoTippy>
  );
}
