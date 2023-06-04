import React, { FC } from "react";
import s from "./CoursesList.module.scss";

import Link from "next/link";
import Image from "next/image";
import { ICourse } from "@/redux/types/course";

import Rating from "../Rating/Rating";

interface ICourseProps {
  courses: ICourse[];
}

const CoursesList: FC<ICourseProps> = ({ courses }) => {
  return (
    <ul className={s.courses__list}>
      {courses.map((course: ICourse) => (
        <li className={s.course__item} key={course.id}>
          <Link className={s.course__link} href={`/courseMore/${course.id}`}>
            <div className={s.course__image}>
              <Image
                src={course.imageUrl}
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
                <li className={s.course__title}>{course.name}</li>
                <li className={s.course__desciption}>{course.description}</li>
                <li className={s.course__creator}>Автор: {course.author}</li>
                <li
                  className={s.course__rating}
                  onClick={(e) => e.preventDefault()}
                >
                  <pre>{course.price}</pre>
                  <Rating value={course.price} />
                </li>
                <li className={s.course__duration}>{course.duration}</li>
                <li className={s.course__language}>{course.language}</li>
              </ul>

              <span className={s.course__price}>{course.price} $</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CoursesList;
