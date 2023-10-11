import { calcCompoundInterest } from "@/utilities/utilities";
import styles from "./CompoundedGrid.module.css";

type Props = { amount: number };

const returns = [0.1, 3, 6, 9, 12];
const decades = [10, 20, 30, 40];

export function CompoundedGrid({ amount }: Props) {
  return (
    <div className={styles.wrapper}>
      {/* Column headers */}
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
    </div>
  );
}
