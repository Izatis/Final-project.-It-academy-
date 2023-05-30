import React, { FC } from "react";
import s from "./SidePanel.module.scss";

import Link from "next/link";
import cn from "classnames";

interface ISidePanelProps {
  sidePanelActive: boolean;
  setSidePanelActive: (active: boolean) => void;
}

const SidePanel: FC<ISidePanelProps> = ({
  sidePanelActive,
  setSidePanelActive,
}) => {
  return (
    <div className={cn(s.sidePanel, { [s.active]: sidePanelActive })}>
      <div className={s.sidePanel__info}>
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default SidePanel;
