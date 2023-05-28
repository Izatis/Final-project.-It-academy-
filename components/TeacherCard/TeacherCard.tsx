import React, { FC } from "react";
import s from "./TeacherCard.module.scss";

import Link from "next/link";
import Image from "next/image";
import Rating from "../Rating/Rating";

interface ITeacher {
  id: number;
  fullName: string;
  profession: string;
  avatar: string;
  description: string;
  reviews: number;
  numberOfCourses: number;
}

export const teachers: ITeacher[] = [
  {
    id: 1,
    fullName: "Andrew Chudlya",
    profession: "React Developer",
    avatar:
      "https://images.squarespace-cdn.com/content/v1/5cd4eaf58d974051df3fe898/1680603773142-CXT03T3ZFXC6QPPNVQ1D/Home+Page+Photo.jpeg?format=2500w",
    description:
      "Добрый день! Меня зовут Петриченко Иван. Уже более 7 лет занимаюсь Front-End разработкой. Я создаю сайты и веб-приложения под ключ, обучаю этому взрослых и детей, организовываю и провожу мероприятия, занимаюсь консалтингом и аудитом.",
    reviews: 123,
    numberOfCourses: 12,
  },
];

const TeacherCard: FC = () => {
  return (
    <>
      {teachers.map((teacher) => {
        return (
          <Link
            className={s.teacher}
            href={`/teacherProfile/${teacher.id}`}
            key={teacher.id}
          >
            <div className={s.teacher__introduction}>
              <Image
                src={teacher.avatar}
                alt="avatar"
                width={300}
                height={200}
              />
              
              <ul className={s.teacher__list}>
                <li className={s.teacher__fullName}>{teacher.fullName}</li>
                <li className={s.teacher__rating}>
                  <pre>4,8</pre> <Rating value={1} />
                </li>
                <li className={s.teacher__item}>{teacher.reviews} отзывов</li>
                <li className={s.teacher__item}>
                  {teacher.numberOfCourses} курса
                </li>
              </ul>
            </div>
            <b className={s.teacher__title}>Немного о себе:</b>
            <p className={s.teacher__description}>{teacher.description}</p>
          </Link>
        );
      })}
    </>
  );
};

export default TeacherCard;
