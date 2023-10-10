import { AlertCircle, AlertTriangle } from "react-feather";
import styles from "./Icon.module.css";

export type IconId = "alert-circle" | "alert-triangle";
export type IconColor = "pink" | "blue";
type Props = {
  id: IconId;
};

const icons = {
  "alert-circle": AlertCircle,
  "alert-triangle": AlertTriangle,
};

export function Icon({ id }: Props) {
  const Component = icons[id];
  let color;
  if (id === "alert-circle") color = "blue";
  if (id === "alert-triangle") color = "red";

  return (
    <div className={styles.wrapper}>
      <Component style={{ color: color }} />
    </div>
  );
}
