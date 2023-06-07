import React, { FC, useEffect, useState } from "react";
import s from "./CourseItem.module.scss";

import Link from "next/link";
import Image from "next/image";
import { useGetCurrentUserQuery } from "@/redux/reducers/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { notification } from "antd";
import { useGetReviwsAvgGradeQuery } from "@/redux/reducers/review";
import { useDeletingACourseMutation } from "@/redux/reducers/course/course";
import { ICourse } from "@/redux/types/course";

import Rating from "../Rating/Rating";

interface ICourseItemProps {
  courseBeckend: ICourse;
}

const CourseItem: FC<ICourseItemProps> = ({ courseBeckend }) => {
  const [token, setToken] = useState("");
  const [course, setCourse] = useState<ICourse>({
    id: 0,
    name: "",
    description: "",
    created: "",
    price: 0,
    language: "",
    author: "",
    authorId: 0,
    imageName: "",
    imageUrl: "",
    duration: 0,
    isPurchase: null,
    grade: 0,
  });

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, []);

  const { data: currentUser = {} } = useGetCurrentUserQuery({ token });

  // ---------------------------------------------------------------------------------------------------------------------------------
  // GET
  const courseId = courseBeckend.id;
  const { data: grade = 0, isLoading: isLoadingGrade } =
    useGetReviwsAvgGradeQuery({ token, courseId });

  useEffect(() => {
    setCourse({ ...courseBeckend, grade: grade });
  }, [courseBeckend, isLoadingGrade]);

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
    <>
      {contextHolder}
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
                <pre>{course.grade}</pre>
                <Rating value={course.grade} />
              </li>
              <li className={s.course__duration}>{course.duration}</li>
              <li className={s.course__language}>{course.language}</li>
            </ul>
            <span className={s.course__price}>{course.price} $</span>
          </div>
        </Link>
        {currentUser.role === "ROLE_ADMIN" && (
          <div className={s.course__trash}>
            <FontAwesomeIcon
              icon={faTrash}
              onClick={(e) => handleClick(e, course.id)}
            />
          </div>
        )}
      </li>
    </>
  );
};

export default CourseItem;
