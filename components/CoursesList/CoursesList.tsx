import React, { FC } from "react";
import s from "./CoursesList.module.scss";

import { ICourse } from "@/redux/types/course";

import CourseItem from "../CourseItem/CourseItem";

interface ICourseProps {
  courses: ICourse[];
}

const CoursesList: FC<ICourseProps> = ({ courses }) => {
  return (
    <ul className={s.courses__list}>
      {courses?.map((course: ICourse) => (
        <CourseItem courseBeckend={course} />
      ))}
    </ul>
  );
};

export default CoursesList;
