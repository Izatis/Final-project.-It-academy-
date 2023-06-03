import React, { useEffect, useState } from "react";
import s from "./coursesList.module.scss";

import { useRouter } from "next/router";
import { categories } from "@/constants/categories";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import CourseItem from "@/components/CoursesList/CoursesList";
import MyButton from "@/components/UI/Buttons/MyButton/MyButton";
import {
  languageFiltering,
  priceFiltering,
} from "@/redux/reducers/course/course.slice";
import Loading from "@/components/Loading/Loading";
import { Select } from "antd";
import { useGettingACategoryQuery } from "@/redux/reducers/category";
import { useReceiveCoursesByCategoryQuery } from "@/redux/reducers/course/course";

export default function () {
  const [token, setToken] = useState("");
  const { query }: { query: any } = useRouter();
  const categoryId = query.id;
  const { data: categories = [] } = useGettingACategoryQuery({ token });
  const { data: courses = [], isLoading } = useReceiveCoursesByCategoryQuery({
    token,
    categoryId,
  });

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, []);

  // ---------------------------------------------------------------------------------------------------------------------------------
  const dispatch = useAppDispatch();
  const handleChangeMain = (option: string) => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    dispatch(priceFiltering({ option, parsedToken }));
  };

  const handleChangeLanguage = (language: string) => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    dispatch(languageFiltering({ language, parsedToken }));
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className={s.courses}>
          <h2 className={s.pageTitle}>
            Все курсы по теме "
            {!!query.id
              ? categories.find((category: any) => category.id === +query.id)
                  ?.title
              : null}
            "
          </h2>

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
          <CourseItem courses={courses} />
        </section>
      )}
    </>
  );
}
