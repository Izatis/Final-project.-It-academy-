import React from "react";
import s from "./adminPage.module.scss";

import Link from "next/link";

import MyButton from "@/components/UI/Buttons/MyButton/MyButton";

const adminPage = () => {
  return (
    <section className={s.adminPage}>
      <div className={s.adminPage__content}>
        <div>
          <h2>Админская панель</h2>
          <p>Управляйте приложением</p>
        </div>
        <Link href="/">
          <MyButton className={s.adminPage__button} type="primary">
            На главную
          </MyButton>
        </Link>
        <Link href="/admin/allCourses">
          <MyButton className={s.adminPage__button} type="primary">
            Все курсы
          </MyButton>
        </Link>
        <Link href="/admin/allUsers">
          <MyButton className={s.adminPage__button} type="primary">
            Вcе пользователи
          </MyButton>
        </Link>
      </div>
    </section>
  );
};

export default adminPage;
