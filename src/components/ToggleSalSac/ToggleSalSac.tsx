import styles from "./ToggleSalSac.module.css";

type Props = { incSalSac: boolean; setIncSalSac: any };

export function ToggleSalSac({ incSalSac, setIncSalSac }: Props) {
  return (
    <div className={styles.wrapper}>
      <div>
        <label htmlFor="incSalSac">include salary sacrifice in chart?</label>
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
