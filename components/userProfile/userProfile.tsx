import React, { useEffect, useState } from "react";
import s from "./userProfile.module.scss";

import Link from "next/link";
import { useRouter } from "next/router";
import { EditOutlined, LogoutOutlined } from "@ant-design/icons";
import en from "../../locales/EN/translation.json";
import ru from "../../locales/RU/translation.json";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import Loading from "../Loading/Loading";
import MyButton from "../UI/Buttons/MyButton/MyButton";

const UserProfile = () => {
  useEffect(() => {
    const fullUrl = window.location.href;
    const token = fullUrl.split(
      "http://localhost:3000/setting/setting?token="
    )[1];    

    if (!!token) {
      // Сохраняем токен пользователя
      localStorage.setItem("token", JSON.stringify(token));
    }
  }, []);
  
  // Для - маршутизации
  const { push, locale } = useRouter();

  // Функции - для смены текста
  const t = locale === "ru" ? ru : en;

  // Выйти из аккаунта
  const signOut = () => {
    push("/");
    localStorage.removeItem("token");
  };

  const { user, isLoading } = useAppSelector((state) => state.users);

  return (
    <div className={s.profile}>
      {isLoading ? (
        <div className={s.loading}>
          <Loading />
        </div>
      ) : (
        <div className={s.profile__content}>
          <h2>Профили и настройки</h2>

          <div className={s.container}>
            <div className={s.fullName}>
              <h2>{user.fullName}</h2>
              <p>{user.email}</p>
            </div>

            <Link href={"/editing/editing"}>
              <MyButton
                background="#03d665"
                hoverBackground="#7329c2"
                type="primary"
                icon={<EditOutlined />}
              >
                Редактировать
              </MyButton>
            </Link>
          </div>

          <p className={s.text}>
            Рыбатекст используется дизайнерами, проектировщиками и
            фронтендерами, когда нужно быстро заполнить макеты или прототипы
            содержимым. Это тестовый контент, который не должен нести никакого
            смысла, лишь показать наличие самого текста или продемонстрировать
            типографику в деле.
          </p>

          <MyButton
            background="#03d665"
            hoverBackground="#7329c2"
            type="primary"
            icon={<LogoutOutlined />}
            onClick={signOut}
          >
            Выйти
          </MyButton>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
