import React, { useEffect, useState } from "react";
import s from "./coursesList.module.scss";

import { useRouter } from "next/router";
import { Select } from "antd";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  languageFiltering,
  priceFiltering,
} from "@/redux/reducers/course/course.slice";
import { useGettingACategoryQuery } from "@/redux/reducers/category";
import { useReceiveCoursesByCategoryQuery } from "@/redux/reducers/course/course";
import { ICourse } from "@/redux/types/course";

import CourseItem from "@/components/CoursesList/CoursesList";
import Loading from "@/components/Loading/Loading";

export default function () {
  const [token, setToken] = useState("");
  const [mainCourses, setMainCourses] = useState<ICourse[]>([]);
  const [mainIsLoading, setMainIsLoading] = useState<boolean>(false);
  const { query }: { query: any } = useRouter();
  const categoryId = query.id;
  const { data: categories = [] } = useGettingACategoryQuery({ token });

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, []);

  // ---------------------------------------------------------------------------------------------------------------------------------
  // DEFAULT DATA
  const { data: courses = [], isLoading } = useReceiveCoursesByCategoryQuery({
    token,
    categoryId,
  });
  useEffect(() => {
    setMainIsLoading(isLoading);
    setMainCourses(courses);
  }, []);

  // ---------------------------------------------------------------------------------------------------------------------------------
  // FILTERING DATA
  const dispatch = useAppDispatch();
  const handleChangePrice = (option: string) => {
    dispatch(priceFiltering({ option, token }));
  };
  const { courses: priceFilteringData, isLoading: priceFilteringIsLoding } =
    useAppSelector((state) => state.course);
  useEffect(() => {
    setMainIsLoading(priceFilteringIsLoding);
    setMainCourses(priceFilteringData);
  }, [priceFilteringIsLoding]);

  const handleChangeLanguage = (option: string) => {
    dispatch(languageFiltering({ option, token }));
  };

  const {
    courses: languageFilteringData,
    isLoading: languageFilteringIsLoding,
  } = useAppSelector((state) => state.course);
  useEffect(() => {
    setMainIsLoading(languageFilteringIsLoding);
    setMainCourses(languageFilteringData);
  }, [languageFilteringIsLoding]);

  return (
    <section className={s.courses}>
      <h2 className={s.pageTitle}>
        Все курсы по теме "
        {!!query.id
          ? categories.find((category: any) => category.id === +query.id)?.title
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
            onChange={handleChangePrice}
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
        </div>

        <span className={s.result}>{courses.length} результата</span>
      </header>

      {mainIsLoading ? <Loading /> : <CourseItem courses={mainCourses} />}
    </section>
  );
}
