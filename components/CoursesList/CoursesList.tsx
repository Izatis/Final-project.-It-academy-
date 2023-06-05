import React, { FC, useEffect, useState } from "react";
import s from "./CoursesList.module.scss";

import Link from "next/link";
import Image from "next/image";
import { notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useGetUserQuery } from "@/redux/reducers/user";
import { useDeletingACourseMutation } from "@/redux/reducers/course/course";
import { ICourse } from "@/redux/types/course";

import Rating from "../Rating/Rating";

interface ICourseProps {
  courses: ICourse[];
}

const CoursesList: FC<ICourseProps> = ({ courses }) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, []);

  const { data: user = {}, isLoading } = useGetUserQuery({ token });

  // ---------------------------------------------------------------------------------------------------------------------------------
  // DELETE
  const [deletingACourse] = useDeletingACourseMutation();

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: any) => {
    api.info({
      message: `Курс успешно удалён!`,
      placement,
    });
  };

  const handleClick = async (event: any, courseId: number) => {
    event.preventDefault();
    await deletingACourse({ token, courseId }).unwrap();
    openNotification(5);
  };

  return (
    <ul className={s.courses__list}>
      {contextHolder}
      {courses.map((course: ICourse) => (
        <li className={s.course__item} key={course.id}>
          <Link className={s.course__link} href={`/courseMore/${course.id}`}>
            <div className={s.course__image}>
              <Image
                src={course.imageUrl}
                alt={course.imageName}
                width={200}
                height={100}
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
          {user.role === "ROLE_ADMIN" && (
            <div className={s.course__trash}>
              <FontAwesomeIcon
                icon={faTrash}
                onClick={(e) => handleClick(e, course.id)}
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CoursesList;
