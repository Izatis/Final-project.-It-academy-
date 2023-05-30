import React, { FC } from "react";
import s from "./BurgerMenu.module.scss";

import cn from "classnames";

interface IBurgerMenu {
  isHeaderActive: boolean;
  setIsHeaderActive: (active: boolean) => void;
  sideBarActive: boolean;
  setSideBarActive: (active: boolean) => void;
}

const BurgerMenu: FC<IBurgerMenu> = ({
  isHeaderActive,
  setIsHeaderActive,
  sideBarActive,
  setSideBarActive,
}) => {
  
  const handleClick = () => {
    setIsHeaderActive(!isHeaderActive);
    setSideBarActive(!sideBarActive);
  };

  return (
    <div className={s.container} onClick={handleClick}>
      <div className={cn(s.burgerMenu, { [s.active]: sideBarActive })}>
        <span></span>
      </div>
    </div>
  );
};

export default BurgerMenu;
