import React, { FC, useEffect, useRef, useState } from "react";
import s from "./Header.module.scss";

import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faGraduationCap,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import en from "../../locales/EN/translation.json";
import ru from "../../locales/RU/translation.json";
import de from "../../locales/DE/translation.json";
import ch from "../../locales/CH/translation.json";
import fr from "../../locales/FR/translation.json";
import uk from "../../locales/UK/translation.json";
import { useAppDispatch } from "@/hooks/redux";
import { reset } from "@/redux/reducers/auth.slice";

import BurgerMenu from "../BurgerMenu/BurgerMenu";
import MyButton from "../../UI/Buttons/MyButton/MyButton";
import TranslateButton from "../../UI/Buttons/TranslateButton/TranslateButton";
import { Avatar } from "antd";

interface IHeaderProps {
  sideBarActive: boolean;
  setSideBarActive: (active: boolean) => void;
}

interface ILine {
  width: number;
  left: number;
}

const Header: FC<IHeaderProps> = ({ sideBarActive, setSideBarActive }) => {
  // Состояние - для header (для позиции)
  const [isHeaderActive, setIsHeaderActive] = useState<boolean>(false);
  // Состояние - для navbar (для линии)
  const [navBarPosition, setNavBarPosition] = useState<ILine>({
    width: 0,
    left: 0,
  });
  // Состояние - для изменение цвета навигации
  const [navColor, setNavColor] = useState<number>(0);

  // Состояние - для токен пользователя
  const [isToken, setIsToken] = useState<boolean>(false);

  // Чтобы получить информацию о текущем маршруте
  const { pathname } = useRouter();

  // С помощью useRef получаем размер и позицию элемента
  const blockRefFirst = useRef<HTMLLIElement>(null);
  const blockRefSecond = useRef<HTMLLIElement>(null);
  const blockRefThree = useRef<HTMLLIElement>(null);
  const blockRefFour = useRef<HTMLLIElement>(null);

  // Жизненный цикл изменяет цвет и позицию линии
  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY === 0) {
        setIsHeaderActive(true);
      }

      if (window.scrollY > 1 && blockRefFirst.current) {
        setIsHeaderActive(false);
        setNavColor(1);
        setNavBarPosition({
          width: blockRefFirst.current.offsetWidth,
          left: blockRefFirst.current.offsetLeft,
        });
      }

      if (window.scrollY >= 500 && blockRefSecond.current) {
        setNavColor(2);
        setNavBarPosition({
          width: blockRefSecond.current.offsetWidth,
          left: blockRefSecond.current.offsetLeft,
        });
      }

      if (window.scrollY >= 1500 && blockRefThree.current) {
        setNavColor(3);
        setNavBarPosition({
          width: blockRefThree.current.offsetWidth,
          left: blockRefThree.current.offsetLeft,
        });
      }

      if (window.scrollY >= 2300 && blockRefFour.current) {
        setNavColor(4);
        setNavBarPosition({
          width: blockRefFour.current.offsetWidth,
          left: blockRefFour.current.offsetLeft,
        });
      }
    };

    if (pathname === "/") {
      if (!sideBarActive) {
        setIsHeaderActive(true);
        window.addEventListener("scroll", handleScroll);
      }
    } else {
      setIsHeaderActive(false);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sideBarActive, pathname]);

  useEffect(() => {
    // Достаем токен пользователя
    const token = localStorage.getItem("token") ?? "";
    const parsedToken = token !== "" ? (JSON.parse(token) as string) : "";
    !!parsedToken ? setIsToken(true) : setIsToken(false);
  }, [pathname]);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    setIsHeaderActive(!isHeaderActive);
    setSideBarActive(!sideBarActive);
  };
  const { locale } = useRouter();

  // Функции - для смены текста
  let t: any;
  switch (locale) {
    case "en":
      t = en;
      break;
    case "de":
      t = de;
      break;
    case "ch":
      t = ch;
      break;
    case "fr":
      t = fr;
      break;
    case "uk":
      t = uk;
      break;
    default:
      t = ru;
      break;
  }
  return (
    <header className={cn(s.header, { [s.active]: isHeaderActive })}>
      <nav className={s.header__nav}>
        {pathname === "/" ? (
          <>
            <a href="#">
              <FontAwesomeIcon
                icon={faGraduationCap}
                className={s.header__logo}
              />
            </a>

            <ul className={s.header__list}>
              <li ref={blockRefFirst}>
                <a
                  href="#"
                  style={
                    navColor === 1 ? { color: "#03d665" } : { color: "#322f55" }
                  }
                >
                  {t.header[0]}
                </a>
              </li>
              <li ref={blockRefSecond}>
                <a
                  href="#categories"
                  style={
                    navColor === 2 ? { color: "#03d665" } : { color: "#322f55" }
                  }
                >
                  {t.header[1]}
                </a>
              </li>
              <li ref={blockRefThree}>
                <a
                  href="#courses"
                  style={
                    navColor === 3 ? { color: "#03d665" } : { color: "#322f55" }
                  }
                >
                  {t.header[2]}
                </a>
              </li>
              <li ref={blockRefFour}>
                <a
                  href="#contacts"
                  style={
                    navColor === 4 ? { color: "#03d665" } : { color: "#322f55" }
                  }
                >
                  {t.header[3]}
                </a>
              </li>
              <span
                className={s.animateLine}
                style={{
                  left: navBarPosition.left,
                  width: navBarPosition.width,
                }}
              ></span>
            </ul>
          </>
        ) : (
          <>
            <Link href="/">
              <FontAwesomeIcon
                icon={faGraduationCap}
                className={s.header__logo}
              />
            </Link>

            <ul className={s.header__list}>
              <li ref={blockRefFirst}>
                <Link href="/"> {t.header[0]}</Link>
              </li>
              <li ref={blockRefSecond}>
                <Link href="/#categories"> {t.header[1]}</Link>
              </li>
              <li ref={blockRefThree}>
                <Link href="/#courses"> {t.header[2]}</Link>
              </li>
              <li ref={blockRefFour}>
                <Link href="/#contacts"> {t.header[3]}</Link>
              </li>
            </ul>
          </>
        )}

        <div className={s.header__buttons}>
          <Link href="/search">
            <FontAwesomeIcon
              className={s.header__search}
              icon={faMagnifyingGlass}
            />
          </Link>
          <Link href="/cartList">
            <FontAwesomeIcon className={s.header__cart} icon={faCartShopping} />
          </Link>

          {/* В зависимости от токена изменяем кнопку на имю и на логотип */}

          {isToken ? (
            <Avatar
              className={s.header__avatar}
              src={"https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"}
              onClick={handleClick}
            />
          ) : pathname === "/auth/signUp" ? (
            <Link href="/auth/signIn">
              <MyButton
                background="#7329c2"
                hoverBackground="#03d665"
                type="primary"
                onClick={() => dispatch(reset())}
              >
                Войти
              </MyButton>
            </Link>
          ) : (
            <Link href="/auth/signUp">
              <MyButton
                background="#7329c2"
                hoverBackground="#03d665"
                type="primary"
                onClick={() => dispatch(reset())}
              >
                Регистрация
              </MyButton>
            </Link>
          )}

          <TranslateButton />

          <BurgerMenu
            isHeaderActive={isHeaderActive}
            setIsHeaderActive={setIsHeaderActive}
            sideBarActive={sideBarActive}
            setSideBarActive={setSideBarActive}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
