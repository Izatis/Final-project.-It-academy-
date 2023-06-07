import React from "react";
import s from "./addMore.module.scss";

import Link from "next/link";

import MyButton from "@/UI/Buttons/MyButton/MyButton";

const AddMore = () => {
  return (
    <section className={s.addMore__list}>
      <h2>Хотите ещё урок добавить?</h2>
      <div className={s.addMore__item}>
        <Link href="/setting/addition/addingLesson">
          <MyButton className={s.addMoreSecond__button}>Да</MyButton>
        </Link>
        <Link href="/userCourses">
          <MyButton className={s.addMoreFirst__button}>Нет</MyButton>
        </Link>
      </div>

      <h2>Хотите ещё раздел добавить?</h2>
      <div className={s.addMore__item}>
        <Link href="/setting/addition/addingSection">
          <MyButton className={s.addMoreSecond__button}>Да</MyButton>
        </Link>
        <Link href="/userCourses">
          <MyButton className={s.addMoreFirst__button}>Нет</MyButton>
        </Link>
      </div>

      <Link href="/setting/userCourses">
        <MyButton
          className={s.goToProfile}
          background="#03d665"
          hoverBackground="#7329c2"
          type="primary"
        >
          Завершить создание курса
        </MyButton>
      </Link>
    </section>
  );
};

export default AddMore;
