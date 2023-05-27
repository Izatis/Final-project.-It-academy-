import React, { FC } from "react";
import s from "./Teacher.module.scss";

import Link from "next/link";
import Image from "next/image";
import teacherImage from "../../public/teacher.png";
import Rating from "../Rating/Rating";

interface ITeacher {
  teacher: {
    id: number;
    name: string;
    avatar: string
  };
}

const Teacher: FC<ITeacher> = ({ teacher }) => {
  return (
    <Link className={s.teacher} href={`/profileTeacher/${teacher.id}`}>
      <div className={s.teacher__info}>
        <Image className={s.teacher__avatar} src={teacherImage} alt="avatar" />

        <ul className={s.teacher__list}>
          <li className={s.teacher__name}>Максим Фролов</li>
          <li className={s.teacher__rating}>
            <pre>4,8</pre> <Rating value={1} />
          </li>
          <li className={s.teacher__item}>32 788 отзывов</li>
          <li className={s.teacher__item}>69 648 студентов</li>
          <li className={s.teacher__item}>7 курса</li>
        </ul>
      </div>

      <b className={s.teacher__title}>Front-End Development and Consulting</b>

      <p className={s.teacher__description}>
        Добрый день! Меня зовут Петриченко Иван. Уже более 7 лет занимаюсь
        Front-End разработкой. Я создаю сайты и веб-приложения "под ключ",
        обучаю этому взрослых и детей, организовываю и провожу мероприятия,
        занимаюсь консалтингом и аудитом.
      </p>
    </Link>
  );
};

export default Teacher;
