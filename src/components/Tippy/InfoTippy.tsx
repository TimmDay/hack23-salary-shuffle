"use client";

import Tippy from "@tippyjs/react";
import { Icon, IconId } from "../Icon/Icon";
import styles from "./InfoTippy.module.css";
type Props = {
  iconId?: IconId;
  children: React.ReactNode;
};

export function InfoTippy({ iconId = "alert-circle", children }: Props) {
  return (
    <div className={styles.wrapper}>
      <Tippy
        interactive={true}
        content={<div className={styles.content}>{children}</div>}
      >
        <div>
          <Icon id={iconId} />
        </div>
      </Tippy>
    </div>
  );
}
