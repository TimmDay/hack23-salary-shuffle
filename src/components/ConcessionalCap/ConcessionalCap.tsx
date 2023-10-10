import styles from "./ConcessionalCap.module.css";

type Props = { sg: number; salSacPerMonth: number };

const CONCESSIONAL_CAP = 27500;
export function ConcessionalCap({ sg, salSacPerMonth }: Props) {
  const total = sg + salSacPerMonth * 12;
  const amountIsUnder = total <= CONCESSIONAL_CAP;
  return (
    <div className={styles.wrapper}>
      <p>{`super from employer: ${sg}`}</p>
      <p>{`annual super from salsac : ${salSacPerMonth * 12}`}</p>
      <p
        className={amountIsUnder ? styles.isUnder : styles.isOver}
      >{`You have used ${total} of ${CONCESSIONAL_CAP}`}</p>
    </div>
  );
}
