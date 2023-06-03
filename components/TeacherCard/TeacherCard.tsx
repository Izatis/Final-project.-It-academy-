import React, { FC, useEffect, useState } from "react";
import s from "./TeacherCard.module.scss";

import Link from "next/link";
import Image from "next/image";
import Rating from "../Rating/Rating";
import { useRouter } from "next/router";
import { useGetReviwsQuery } from "@/redux/reducers/review";
import { useGetTeacherQuery } from "@/redux/reducers/user";
import { useAppSelector } from "@/hooks/redux";
import { useGettingACourseQuery } from "@/redux/reducers/course/course";

interface ITeacher {
  id: number;
  fullName: string;
  profession: string;
  avatar: string;
  description: string;
  reviews: number;
  numberOfCourses: number;
}

const TeacherCard: FC = () => {
  const [token, setToken] = useState("");
  const { query }: { query: any } = useRouter();
  const courseId = query.id;
  const { data: course = [] } = useGettingACourseQuery({
    token,
    courseId,
  });
  const teacherId = course.authorId;

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, []);

  const { data: teacher = [] } = useGetTeacherQuery({ teacherId, token });
  console.log(teacher);

  return (
    <Link
      className={s.teacher}
      href={`/teacherProfile/${teacher.id}`}
      key={teacher.id}
    >
      <div className={s.teacher__introduction}>
        <Image src={teacher.imageUrl} alt="avatar" width={300} height={200} />

        <ul className={s.teacher__list}>
          <li className={s.teacher__fullName}>{teacher.fullName}</li>
          <li className={s.teacher__description}>{teacher.email}</li>
          <li className={s.teacher__description}>{teacher.dateOfBirth}</li>
          <li className={s.teacher__rating}>
            <pre>4,8</pre> <Rating value={1} />
          </li>
          <li className={s.teacher__item}>{teacher.reviews} отзывов</li>
          <li className={s.teacher__item}>{teacher.numberOfCourses} курса</li>
        </ul>
      </div>
      <b className={s.teacher__title}>Немного о себе:</b>
    </Link>
  );
};

export default TeacherCard;
