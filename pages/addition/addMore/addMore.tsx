import React from "react";
import s from "./addMore.module.scss";

import Link from "next/link";

import MyButton from "@/UI/Buttons/MyButton/MyButton";

const AddMore = () => {
  return (
    <section className={s.addMore__list}>
      <h2>Хотите ещё урок добавить?</h2>
      <div className={s.addMore__item}>
        <Link href="/addition/addingLesson/addingLesson">
          <MyButton
            className={s.addMoreSecond__button}          >
            Да
          </MyButton>
        </Link>
        <Link href="/userCourse/userCourse">
          <MyButton
            className={s.addMoreFirst__button}          >
            Нет
          </MyButton>
        </Link>
      </div>

      <h2>Хотите ещё раздел добавить?</h2>
      <div className={s.addMore__item}>
        <Link href="/addition/addingSection/addingSection">
          <MyButton
            className={s.addMoreSecond__button}          >
            Да
          </MyButton>
        </Link>
        <Link href="/userCourse/userCourse">
          <MyButton
            className={s.addMoreFirst__button}          >
            Нет
          </MyButton>
        </Link>
      </div>
    </section>
  );
};

export default AddMore;
