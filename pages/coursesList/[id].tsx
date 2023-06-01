import React, { useEffect, useState } from "react";
import s from "./coursesList.module.scss";

import { useRouter } from "next/router";
import { categories } from "@/constants/categories";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import CourseItem from "@/components/CourseItem/CourseItem";
import MyButton from "@/components/UI/Buttons/MyButton/MyButton";
import {
  fetchCourses,
  filteredLanguage,
  filteredPrice,
} from "@/redux/reducers/course.slice";
import Loading from "@/components/Loading/Loading";
import { Select } from "antd";

export default function () {
  const dispatch = useAppDispatch();
  const { courses, isLoading } = useAppSelector((state) => state.course);

  useEffect(() => {
    // Достаем токен пользователя
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);

    // Отправляем get запрос для получение курсов
    dispatch(fetchCourses(parsedToken));
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

  // ---------------------------------------------------------------------------------------------------------------------------------
  // Для фильтрации по цене
  const handleChangeMain = (value: string) => {
    console.log(value === "1");
    // Достаем токен пользователя
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);

    if (value === "1") {
      dispatch(filteredPrice({ parsedToken }));
    }
  };

  // Для филтрации по языку
  const handleChangeLanguage = (language: string) => {
    console.log(language);

    // Достаем токен пользователя
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    dispatch(filteredLanguage({ language, parsedToken }));
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className={s.courses}>
          <h2 className={s.pageTitle}>Все курсы по теме "{category.name}"</h2>

          <header className={s.courses__header}>
            <div className={s.filtered}>
              <Select
                className={s.filtered__select}
                defaultValue="Филтрация"
                onChange={handleChangeMain}
                options={[
                  { value: "1", label: "По цене" },
                  { value: "2", label: "По длительности" },
                ]}
              />

              <Select
                className={s.filtered__select}
                defaultValue="Филтрация по языку"
                onChange={handleChangeLanguage}
                options={[
                  { value: "ru", label: "Русский" },
                  { value: "en", label: "English" },
                ]}
              />

              <MyButton className={s.filtered__button}>Фильтировать</MyButton>
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
