import { calcCompoundInterest } from "@/utilities/utilities";
import Link from "next/link";
import { InfoTippy } from "../Tippy/InfoTippy";
import styles from "./CompoundedGrid.module.css";

type Props = { amount: number };

const returns = [0.1, 3, 6, 9, 12];
const decades = [10, 20, 30, 40];

export function CompoundedGrid({ amount }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.gridItem}></div>
      {decades.map((decade) => (
        <div className={styles.gridItem}>{`${decade} years`}</div>
      ))}

      {returns.map((rate) => (
        <>
          <div className={styles.gridItem}>{`at ${rate}%`}</div>
          {decades.map((decade) => (
            <div className={styles.gridItem}>{`$${calcCompoundInterest(
              1,
              rate,
              decade,
              amount
            )}`}</div>
          ))}
        </>
      ))}

      {/* <Tippy sg={sg} salSacPerMonth={salSacPerMonth} /> */}
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
