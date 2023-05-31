import React from "react";
import s from "./myCourses.module.scss";

import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import MyButton from "@/components/MUI/Buttons/MyButton/MyButton";
import CourseItem from "@/components/CourseItem/CourseItem";

const myCourse = () => {
  const dispatch = useAppDispatch();
  const { courses, isLoading } = useAppSelector((state) => state.course);

  return (
    <section className={s.myCourse}>
      <div className={s.addingCourse}>
        <p>У вас нету курсов</p>
        <Link href="/addingCourse/addingCourse">
          <MyButton
            background="#7329c2"
            hoverBackground="#03d665"
            type="primary"
            loading={isLoading}
          >
            Нажмите чтобы создать
          </MyButton>
        </Link>
      </div>

      <ul className={s.myCourse__list}>
      {courses.map((course) => {
        return (
            <CourseItem course={course} />
            );
        })}
        </ul>
    </section>
  );
};

export default myCourse;
