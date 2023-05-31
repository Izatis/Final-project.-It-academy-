import React, { useEffect, useState } from "react";
import s from "./coursesList.module.scss";

import { useRouter } from "next/router";
import { categories } from "@/constants/categories";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import CourseItem from "@/components/CourseItem/CourseItem";
import MyButton from "@/components/MUI/Buttons/MyButton/MyButton";
import MySelect from "@/components/MUI/MySelect/MySelect";
import { fetchCourses, fetchDuration } from "@/redux/reducers/course.slice";
import Loading from "@/components/Loading/Loading";

export default function () {
  const dispatch = useAppDispatch();
  const { courses, isLoading } = useAppSelector((state) => state.course);

  console.log(courses);

  useEffect(() => {
    // Отправляем get запрос для получение курсов
    const getCourses = async () => {
      // Достаем токен пользователя
      const parsedToken = JSON.parse(localStorage.getItem("token") as string);

      dispatch(fetchCourses(parsedToken));

      const id: number = 2;
      const parsedsToken: string = parsedToken;
      dispatch(fetchDuration({ id, parsedsToken }));
    };

    getCourses();
  }, []);

  // Состояние - для объекта из массива categories
  const [category, setCategory] = useState<any>({});

  const { query }: { query: any } = useRouter();

  // Получает объект из массива categories
  useEffect(() => {
    if (!!query.id) {
      const category = categories.find(
        ({ id }: { id: number }) => id === +query.id
      );
      setCategory(category);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
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

            <span className={s.result}>{courses.length} результата</span>
          </header>

          <ul className={s.courses__list}>
            {courses.map((course) => (
              <CourseItem course={course} key={course.id} />
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
