"use client";

import Tippy from "@tippyjs/react";
import { Icon, IconId } from "../Icon/Icon";
import styles from "./InfoTippy.module.css";
type Props = {
  iconId?: IconId;
  children: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
};

export function InfoTippy({
  iconId = "alert-circle",
  placement,
  children,
}: Props) {
  return (
    <div className={styles.wrapper}>
      <Tippy
        interactive={true}
        content={<div className={styles.content}>{children}</div>}
        placement={placement}
      >
        <div>
          <Icon id={iconId} />
        </div>
      </Tippy>
    </div>
  );
}
