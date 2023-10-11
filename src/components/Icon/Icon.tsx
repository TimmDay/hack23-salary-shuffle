import { AlertCircle, AlertTriangle, DollarSign } from "react-feather";
import styles from "./Icon.module.css";

export type IconId = "alert-circle" | "alert-triangle" | "dollar-sign";
type Props = {
  id: IconId;
};

const icons = {
  "alert-circle": AlertCircle,
  "alert-triangle": AlertTriangle,
  "dollar-sign": DollarSign,
};

export function Icon({ id }: Props) {
  const Component = icons[id];
  let color = "hsl(265, 4%, 31%)";
  if (id === "alert-circle") color = "var(--color-accent-1)";
  if (id === "alert-triangle") color = "var(--color-error-100)";

  return (
    <div className={styles.wrapper}>
      <Component style={{ color: color }} />
    </div>
  );
}
