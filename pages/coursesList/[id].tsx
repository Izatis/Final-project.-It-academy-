import React, { useEffect, useState } from "react";
import s from "./coursesList.module.scss";

import { useRouter } from "next/router";
import { Pagination, PaginationProps, Select } from "antd";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  languageFiltering,
  priceFiltering,
} from "@/redux/reducers/course/course.slice";
import { useGettingACategoryQuery } from "@/redux/reducers/category";
import { useReceiveCoursesAmountPageByCategoryMutation } from "@/redux/reducers/course/course";

import CourseList from "@/components/CoursesList/CoursesList";
import Loading from "@/components/Loading/Loading";

export default function () {
  const [token, setToken] = useState("");
  const [state, setState] = useState("");
  const [language, setLanguage] = useState("");
  const [price, setPrice] = useState("");
  const [mainIsLoading, setMainIsLoading] = useState(false);
  const [mainCourses, setMainCourses] = useState<any>([]);
  const [mainAmountPage, setMainAmountPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const { query }: { query: any } = useRouter();
  const categoryId = query.id;
  const { data: categories = [] } = useGettingACategoryQuery({ token });

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, []);

  const onChange: PaginationProps["onChange"] = async (pageNumber) => {
    setPageNumber(pageNumber);
    if (state === "price") {
      dispatch(
        priceFiltering({ token, categoryId, pageNumber, option: price })
      );
    }
    if (state === "language") {
      dispatch(
        languageFiltering({ token, categoryId, pageNumber, option: language })
      );
    } else {
      await receiveCoursesAmountPageByCategory({
        token,
        categoryId,
        pageNumber,
      }).unwrap();
    }
  };
  // ---------------------------------------------------------------------------------------------------------------------------------
  // DEFAULT DATA
  const [receiveCoursesAmountPageByCategory, { data, isLoading }] =
    useReceiveCoursesAmountPageByCategoryMutation();

  useEffect(() => {
    receiveCoursesAmountPageByCategory({ token, categoryId, pageNumber });
  }, [query]);
  useEffect(() => {
    setMainIsLoading(isLoading);
    setMainCourses(data?.courses);
    if (data?.amountPage) {
      setMainAmountPage(data.amountPage.length * 10);
    }
  }, [isLoading]);

  // ---------------------------------------------------------------------------------------------------------------------------------
  // FILTERING DATA
  const dispatch = useAppDispatch();
  const handleChangePrice = (option: string) => {
    setState("price");
    setPrice(option);
    dispatch(priceFiltering({ token, categoryId, pageNumber, option }));
  };
  const {
    coursesAmountPage: priceFilteringData,
    isLoading: priceFilteringIsLoding,
  } = useAppSelector((state) => state.course);
  useEffect(() => {
    setMainIsLoading(priceFilteringIsLoding);
    setMainCourses(priceFilteringData.courses);
    if (priceFilteringData?.amountPage) {
      setMainAmountPage(priceFilteringData.amountPage.length * 10);
    }
  }, [priceFilteringIsLoding]);

  const handleChangeLanguage = (option: string) => {
    setState("language");
    setLanguage(option);
    dispatch(languageFiltering({ token, categoryId, pageNumber, option }));
  };

  const {
    coursesAmountPage: languageFilteringData,
    isLoading: languageFilteringIsLoding,
  } = useAppSelector((state) => state.course);
  useEffect(() => {
    setMainIsLoading(languageFilteringIsLoding);
    setMainCourses(languageFilteringData.courses);
    if (languageFilteringData?.amountPage) {
      setMainAmountPage(languageFilteringData.amountPage.length * 10);
    }
  }, [languageFilteringIsLoding]);

  // ---------------------------------------------------------------------------------------------------------------------------------
  // MAIN REQUEST

  return (
    <section className={s.courses}>
      <h2 className={s.pageTitle}>
        Все курсы по теме "
        {query.id
          ? categories.find((category: any) => category.id === +query.id)?.title
          : null}
        "
      </h2>

      <header className={s.courses__header}>
        <div className={s.filtered}>
          <Select
            className={s.filtered__select}
            defaultValue="Фильтрация по цене"
            options={[
              { value: "ascending", label: "По убыванию" },
              { value: "descending", label: "По возрастанию" },
            ]}
            onChange={handleChangePrice}
          />

          <Select
            className={s.filtered__select}
            defaultValue="Фильтрация по языку"
            options={[
              { value: "ru", label: "Русский" },
              { value: "en", label: "English" },
            ]}
            onChange={handleChangeLanguage}
          />
        </div>

        <span className={s.result}>{mainCourses?.length} результатов</span>
      </header>

      {mainIsLoading ? <Loading /> : <CourseList courses={mainCourses} />}

      <footer className={s.courses__footer}>
        <Pagination
          className={s.pagination}
          showQuickJumper
          defaultCurrent={1}
          total={mainAmountPage}
          onChange={onChange}
        />
      </footer>
    </section>
  );
}
