import { CSSProperties } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./DollarInput.module.css";

type Props = { sg: number; salSacPerMonth: number };

const SIZES = {
  small: {
    "--height": 24 / 16 + "rem",
    "--font-size": 14 + "px",
    "--border-thickness": 1 + "px",
    "--padding-left": 24 + "px",
    "--icon-size": 16 + "px",
  },
  large: {
    "--height": 36 / 16 + "rem",
    "--font-size": 18 + "px",
    "--border-thickness": 2 + "px",
    "--padding-left": 36 + "px",
    "--icon-size": 24 + "px",
  },
};

type Sizes = "small" | "large";

type IconInputProps = {
  label: string;
  width: number;
  size: Sizes;
  placeholder: string;
  // value: any
  // onChange: any
};

export function DollarInput(props: IconInputProps) {
  const { label, width = 250, size, ...delegated } = props;
  const cssvars = SIZES[size] as CSSProperties;

  const iconSize = size === "small" ? 16 : 24;

  return (
    <label className={styles.wrapper}>
      {/* <VisuallyHidden>{label}</VisuallyHidden> */}

      <span className={styles.iconWrapper}>
        <Icon id={"dollar-sign"} />
      </span>

      <input
        className={styles.textInput}
        type="number"
        min={0}
        width={width}
        style={cssvars}
        {...delegated}
      />
      {/* <IconWrapper style={styles}>
        <Icon id={icon} size={iconSize} />
      </IconWrapper>

      <TextInput type="text" width={width} style={styles} {...delegated} /> */}
    </label>
  );
}
