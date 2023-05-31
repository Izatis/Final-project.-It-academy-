import React, { FC } from "react";
import s from "./CourseItem.module.scss";

import Link from "next/link";
import Image from "next/image";

import Rating from "../Rating/Rating";

interface ICourseProps {
  course: {
    id: number;
    name: string;
    description: string;
    created: string;
    price: number;
    language: string;
    imageUrl: string;
  };
}

const CourseItem: FC<ICourseProps> = ({ course }) => {
  console.log(course.imageUrl);

  return (
    <li className={s.course__item} key={course.id}>
      <Link className={s.course__link} href={`/courseMore/${course.id}`}>
        <div className={s.course__image}>
          <Image src={course.imageUrl} alt="poster" width={300} height={200} />

          <div className={s.blackout}>
            <span>Нажмите</span>
          </div>
        </div>

        <div className={s.course__info}>
          <ul className={s.content__list}>
            <li className={s.course__title}>{course.name}</li>
            <li className={s.course__desciption}>{course.description}</li>
            <li className={s.course__creator}>Автор: {course.description}</li>
            <li
              className={s.course__rating}
              onClick={(e) => e.preventDefault()}
            >
              <pre>{course.price}</pre>
              <Rating value={2.5} />
            </li>
            <li className={s.course__duration}>{course.price}</li>
          </ul>

          <span className={s.course__price}>{course.price} $</span>
        </div>
      </Link>
    </li>
  );
};

export default CourseItem;

import axios from "axios";
