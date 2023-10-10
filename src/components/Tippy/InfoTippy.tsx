import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import styles from "./InfoTippy.module.css";
type Props = {};

export function InfoTippy({}: Props) {
  return (
    <div className={styles.wrapper}>
      <Tippy interactive={true} content={<div> tip tip tiodo</div>}>
        <p>tip tip todo</p>
      </Tippy>
    </div>
  );
}
