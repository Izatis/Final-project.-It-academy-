import React, { useEffect, useState } from "react";
import s from "./coursesList.module.scss";

import { useRouter } from "next/router";
import { categories } from "@/constants/categories";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import CourseItem from "@/components/CourseItem/CourseItem";
import MyButton from "@/components/UI/Buttons/MyButton/MyButton";
import {
  gettingAllCourses,
  languageFiltering,
  priceFiltering,
} from "@/redux/reducers/course.slice";
import Loading from "@/components/Loading/Loading";
import { Select } from "antd";

export default function () {
  const dispatch = useAppDispatch();
  const { courses, isLoading } = useAppSelector((state) => state.course);

  useEffect(() => {
    // Достаем токен пользователя
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);

    // Отправляем get запрос для получение разделa курса
    dispatch(gettingAllCourses(parsedToken));
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
  const handleChangeMain = (option: string) => {
    // Достаем токен пользователя
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);

    dispatch(priceFiltering({ option, parsedToken }));
  };

  // Для филтрации по языку
  const handleChangeLanguage = (language: string) => {
    console.log(language);

    // Достаем токен пользователя
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    dispatch(languageFiltering({ language, parsedToken }));
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
                defaultValue="Филтрация по цене"
                options={[
                  { value: "ascending", label: "По убыванию" },
                  { value: "descending", label: "По возрастанию" },
                ]}
                onChange={handleChangeMain}
              />

              <Select
                className={s.filtered__select}
                defaultValue="Филтрация по языку"
                options={[
                  { value: "ru", label: "Русский" },
                  { value: "en", label: "English" },
                ]}
                onChange={handleChangeLanguage}
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
