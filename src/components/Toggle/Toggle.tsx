import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import styles from "./Toggle.module.css";

const DEFAULT_CIRCLE_DIAMETER = 20;
const ANIMATION_DURATION = 140;

type ToggleProps = {
  selected: boolean;
  setSelected: Dispatch<SetStateAction<boolean>>;
  label: string;
  disabled?: boolean;
  circleDiameter?: number;
};

export function Toggle({
  selected,
  setSelected,
  label,
  disabled = false,
  circleDiameter = DEFAULT_CIRCLE_DIAMETER,
  children,
}: PropsWithChildren<ToggleProps>) {
  const backgroundColor = "pink";

  const STYLES = {
    backgroundColor: disabled ? `pink` : `#999`,
  };

  const handleToggle = () => {
    const toggleState = !selected;
    if (disabled) return;
    setSelected(toggleState);
  };
  return (
    <>
      {/* <VisuallyHidden>
        <Label htmlFor={`${label}-toggle`}>
          {intl.formatMessage(messages.toggleLabel, {
            label: `${label}`,
          })}
        </Label>
      </VisuallyHidden> */}
      <input
        className={styles.nativeCheck}
        type="checkbox"
        id={`${label}-toggle`}
        value={label}
        checked={selected}
        onChange={handleToggle}
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
          if (event.key === "Enter") {
            handleToggle();
          }
        }}
        readOnly
      />

      {/* <PresentationCheck
        id={`${label}-presentation`}
        data-testid={`${label}-presentation`}
        $toggleActive={selected && !disabled}
        onClick={handleToggle}
        style={STYLES}
        $backgroundColor={backgroundColor}
        $circleDiameter={circleDiameter}
      >
        <Circle $selected={selected} $circleDiameter={circleDiameter}>
          {children}
        </Circle>
      </PresentationCheck> */}
    </>
  );
}
