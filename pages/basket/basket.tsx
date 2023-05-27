import React from "react";
import s from "./basket.module.scss";

import { courses } from "@/constants/courses";

import Course from "@/components/Course/Course";

const Basket = () => {
  return (
    <section className={s.basket}>
      <h2>Корзина</h2>
      {courses.map((course) => {
        return <Course course={course} key={course.id}/>;
      })}
    </section>
  );
};

export default Basket;
