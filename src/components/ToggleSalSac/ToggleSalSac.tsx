import styles from "./ToggleSalSac.module.css";

type Props = { incSalSac: boolean; setIncSalSac: any };

export function ToggleSalSac({ incSalSac, setIncSalSac }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.toggle}>
        <label htmlFor="incSalSac">include salary sacrifice on chart?</label>
        <input
          type="checkbox"
          title="incSalSac"
          checked={incSalSac}
          onChange={() => setIncSalSac((prev: boolean) => !prev)}
        />
      </div>
    </div>
  );
}
