import Link from "next/link";
import { InfoTippy } from "../Tippy/InfoTippy";
import styles from "./ConcessionalCap.module.css";

type Props = { sg: number; salSacPerMonth: number };

const CONCESSIONAL_CAP = 27500;
export function ConcessionalCap({ sg, salSacPerMonth }: Props) {
  const total = sg + salSacPerMonth * 12;
  const amountIsUnder = total <= CONCESSIONAL_CAP;
  return (
    <div className={styles.wrapper}>
      <p
        className={amountIsUnder ? styles.isUnder : styles.isOver}
      >{`You have used $${total} of $${CONCESSIONAL_CAP}`}</p>

      <Tippy sg={sg} salSacPerMonth={salSacPerMonth} />
    </div>
  );
}

function Tippy({ sg, salSacPerMonth }: any) {
  return (
    <InfoTippy iconId="alert-circle" placement="bottom">
      <div className={styles.tipContent}>
        <div>{`The Concessional  Contributions Cap includes:`}</div>
        <div>{`- super from employer: $${sg}`}</div>
        <div>{`- annual super from salsac : $${salSacPerMonth * 12}`}</div>
        <div>
          This is the maximum amount of super contributions that you can get tax
          benefits for in a single financial year.
        </div>

        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.ato.gov.au/individuals/super/growing-and-keeping-track-of-your-super/caps-limits-and-tax-on-super-contributions/concessional-contributions-cap/#:~:text=From%201%20July%202021%2C%20the,ordinary%20time%20earnings%20(AWOTE)."
        >
          ATO Concessional Contributions Cap
        </Link>

        <div>
          HOWEVER, there is a trick to exceed it. You can carry forward leftover
          cap from the previous 5 years. Here's how:
        </div>
        <Link href="/carryForward">Carry Forward Contributions</Link>
      </div>
    </InfoTippy>
  );
}
