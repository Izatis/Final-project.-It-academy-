import React, { useEffect, useState } from "react";
import s from "./coursesList.module.scss";

import axios from "axios";
import { useRouter } from "next/router";
import { courses, ICourses } from "../../constants/courses";
import { categories } from "@/constants/categories";

import MyButton from "@/components/MUI/Buttons/MyButton/MyButton";
import MySelect from "@/components/MUI/MySelect/MySelect";
import CourseItem from "@/components/CourseItem/CourseItem";

export default function () {
  // Состояние - для карточек
  const [coursesData, setCoursesData] = useState<ICourses[]>(courses);
  // Состояние - для объекта из массива categories
  const [category, setCategory] = useState<any>({});

  const { query }: { query: any } = useRouter();

  // Получает объект из массива categories
  useEffect(() => {
    if (!!query.id) {
      const category = categories.find(
        ({ id }: { id: any }) => id === +query.id
      );
      setCategory(category);
    }
  }, []);

  // Отправляем get запрос для карточек
  const getCourses = async () => {
    const BASE_URL = "http://localhost:8080/course";
    try {
      const response = await axios.get(BASE_URL);

      setCoursesData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);
  return (
    <section className={s.courses}>
      <h2 className={s.pageTitle}>Все курсы по теме "{category.name}"</h2>

      <header className={s.courses__header}>
        <div className={s.filtered}>
          <MyButton className={s.filtered__button}>Фильтировать</MyButton>

          <MySelect
            className={s.filtered__select}
            defaultValue="Filtered"
            options={[
              { value: "Admin", label: "Admin" },
              { value: "User", label: "User" },
            ]}
          />
        </div>

        <span className={s.result}>{coursesData.length} результата</span>
      </header>

      <ul className={s.courses__list}>
        {coursesData.map((course) => (
          <CourseItem course={course} key={course.id} />
        ))}
      </ul>
    </section>
  );
}
