import React, { FC, useEffect, useState } from "react";
import s from "./SideBar.module.scss";

import { useRouter } from "next/router";
import Link from "next/link";
import cn from "classnames";
import { Avatar } from "antd";
import { useAppSelector } from "@/hooks/redux";
import { useGetUserQuery } from "@/redux/reducers/user";

import TranslateButton from "../../UI/Buttons/TranslateButton/TranslateButton";

interface ISideBarProps {
  sideBarActive: boolean;
  setSideBarActive: (active: boolean) => void;
}

const SideBar: FC<ISideBarProps> = ({ sideBarActive, setSideBarActive }) => {
  const { pathname } = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, []);

  const { data: user = [] } = useGetUserQuery({ token });

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
              <Link href="/cartList/cartList">Моя корзина</Link>
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
              <Link href="/cartList/cartList">Моя корзина</Link>
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
