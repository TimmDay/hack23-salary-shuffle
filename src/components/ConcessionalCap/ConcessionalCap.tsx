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
      >{`You have used ${total} of ${CONCESSIONAL_CAP}`}</p>

      <Tippy sg={sg} salSacPerMonth={salSacPerMonth} />
    </div>
  );
}

function Tippy({ sg, salSacPerMonth }: any) {
  return (
    <InfoTippy iconId="alert-circle">
      <>
        <div>{`The Concessional  Contributions Cap includes:`}</div>
        <div>{`- super from employer: $${sg}`}</div>
        <div>{`- annual super from salsac : $${salSacPerMonth * 12}`}</div>
        <div>
          This is the maximum amount of super contributions that you can get tax
          benefits for in a single financial year.
        </div>
        <a href="">ATO Concessional Contributions Cap</a>
        <div>
          HOWEVER, there is a trick to exceed it. You can carry forward leftover
          cap from the previous 5 years. Here's how:
        </div>
        <Link href="/carryForward">Carry Forward Contributions</Link>
      </>
    </InfoTippy>
  );
}
