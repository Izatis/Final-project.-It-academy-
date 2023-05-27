import React, { FC } from "react";
import s from "./CourseItem.module.scss";

import Link from "next/link";
import Image from "next/image";

import Rating from "../Rating/Rating";

interface ICourseProps {
  course: {
    id: number;
    title: string;
    description: string;
    creator: string;
    price: number;
  };
}

const CourseItem: FC<ICourseProps> = ({ course }) => {
  return (
    <li className={s.course__item} key={course.id}>
      <Link className={s.course__link} href={`/courseMore/${course.id}`}>
        <div className={s.course__image}>
          <Image
            src={
              "https://img.freepik.com/premium-photo/word-design-written-top-colorful-geometric-3d-shapes_2227-1663.jpg"
            }
            alt="poster"
            width={300}
            height={200}
          />

          <div className={s.blackout}>
            <span>Нажмите</span>
          </div>
        </div>

        <div className={s.course__info}>
          <ul className={s.content__list}>
            <li className={s.course__title}>{course.title}</li>
            <li className={s.course__desciption}>{course.description}</li>
            <li className={s.course__creator}>Автор: {course.creator}</li>
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
