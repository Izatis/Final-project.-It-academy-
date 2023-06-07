import React, { FC } from "react";
import s from "./SideBar.module.scss";

import { useRouter } from "next/router";
import Link from "next/link";
import cn from "classnames";
import { Avatar } from "antd";
import { IUser } from "@/redux/types/user";

interface ISideBarProps {
  sideBarActive: boolean;
  setSideBarActive: (active: boolean) => void;
  userCurrent: IUser
}

const SideBar: FC<ISideBarProps> = ({ sideBarActive, setSideBarActive, userCurrent }) => {
  const { pathname } = useRouter();

  return (
    <div
      className={cn(s.menu, { [s.active]: sideBarActive })}
      onClick={() => setSideBarActive(!sideBarActive)}
    >
      <div className={s.blur}></div>

      <div className={s.menu__content} onClick={(e) => e.stopPropagation()}>
        <Link
          className={s.sidePanel__header}
          href="/settings/userSettings"
          onClick={() => setSideBarActive(!sideBarActive)}
        >
          <Avatar
            className={s.menu__avatar}
            src={userCurrent.imageUrl}
          />
          <div className={s.sidePanel__info}>
            <h4>{userCurrent.fullName}</h4>
            <p>{userCurrent.email}</p>
          </div>
        </Link>

        {pathname === "/" ? (
          <ul className={s.menu__list}>
            <li>
              <Link href="/cartList">Моя корзина</Link>
            </li>
            <li>
              <Link href="/">Список желаний</Link>
            </li>
            <li>
              <Link href="/setting">Профиль</Link>
            </li>
            <li>
              <a href="#" onClick={() => setSideBarActive(!sideBarActive)}>
                Главная
              </a>
            </li>
            <li>
              <a
                href="#categories"
                onClick={() => setSideBarActive(!sideBarActive)}
              >
                Категории
              </a>
            </li>
            <li>
              <a
                href="#courses"
                onClick={() => setSideBarActive(!sideBarActive)}
              >
                Курсы
              </a>
            </li>
            <li>
              <a
                href="#contacts"
                onClick={() => setSideBarActive(!sideBarActive)}
              >
                Контакты
              </a>
            </li>
          </ul>
        ) : (
          <ul className={s.menu__list}>
            <li>
              <Link href="/cartList">Моя корзина</Link>
            </li>
            <li>
              <Link href="/">Список желаний</Link>
            </li>
            <li>
              <Link href="/setting">Профиль</Link>
            </li>
            <li>
              <Link href="/" onClick={() => setSideBarActive(!sideBarActive)}>
                Главная
              </Link>
            </li>
            <li>
              <Link
                href="/#categories"
                onClick={() => setSideBarActive(!sideBarActive)}
              >
                Категории{" "}
              </Link>
            </li>
            <li>
              <Link
                href="/#courses"
                onClick={() => setSideBarActive(!sideBarActive)}
              >
                Курсы
              </Link>
            </li>
            <li>
              <Link
                href="/#contacts"
                onClick={() => setSideBarActive(!sideBarActive)}
              >
                Контакты
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default SideBar;
