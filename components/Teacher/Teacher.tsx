import React, { FC } from "react";
import s from "./Teacher.module.scss";

import Link from "next/link";
import Image from "next/image";
import teacher from "../../public/teacher.png";
import Rating from "../Rating/Rating";

const Teacher = () => {
  return (
    <Link className={s.teacher} href="#">
      <div className={s.introduction}>
        <Image className={s.avatar} src={teacher} alt="avatar" />
        <ul className={s.teacher__list}>
          <li>
            <h2>Максим Фролов</h2>
          </li>
          <li className={s.rating}>
            4,8 <Rating value={1} />
          </li>
          <li className={s.teacher__item}>32 788 отзывов</li>
          <li className={s.teacher__item}>69 648 студентов</li>
          <li className={s.teacher__item}>7 курса</li>
        </ul>
      </div>
      <b>Front-End Development and Consulting</b>
      <p>
        Добрый день! Меня зовут Петриченко Иван. Уже более 7 лет занимаюсь
        Front-End разработкой. Я создаю сайты и веб-приложения "под ключ",
        обучаю этому взрослых и детей, организовываю и провожу мероприятия,
        занимаюсь консалтингом и аудитом.
      </p>
    </Link>
  );
};

export default Teacher;
