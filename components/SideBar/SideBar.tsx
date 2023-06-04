import React, { FC } from "react";
import s from "./SideBar.module.scss";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import cn from "classnames";
import { useAppSelector } from "@/hooks/redux";

import TranslateButton from "../../UI/Buttons/TranslateButton/TranslateButton";
import { Avatar } from "antd";

interface ISideBarProps {
  sideBarActive: boolean;
  setSideBarActive: (active: boolean) => void;
}

const SideBar: FC<ISideBarProps> = ({ sideBarActive, setSideBarActive }) => {
  // Чтобы получить информацию о текущем маршруте
  const { pathname } = useRouter();

  const { user } = useAppSelector((state) => state.users);

  return (
    <div
      className={cn(s.menu, { [s.active]: sideBarActive })}
      onClick={() => setSideBarActive(!sideBarActive)}
    >
      <div className={s.blur}></div>

      <div className={s.menu__content} onClick={(e) => e.stopPropagation()}>
        <Link
          className={s.sidePanel__header}
          href="/setting/setting"
          onClick={() => setSideBarActive(!sideBarActive)}
        >
           <Avatar
              className={s.menu__avatar}
              src={"https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"}
            />
          <div className={s.sidePanel__info}>
            <h4>{user.fullName}</h4>
            <p>{user.email}</p>
            <TranslateButton className={s.menu__translateButton} />
          </div>
        </Link>

        {pathname === "/" ? (
          <ul className={s.menu__list}>
            <li>
              <Link href="/basketList/basketList">Моя корзина</Link>
            </li>
            <li>
              <Link href="/">Список желаний</Link>
            </li>
            <li>
              <Link href="/setting/setting">Профиль</Link>
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
              <Link href="/basketList/basketList">Моя корзина</Link>
            </li>
            <li>
              <Link href="/">Список желаний</Link>
            </li>
            <li>
              <Link href="/setting/setting">Профиль</Link>
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
