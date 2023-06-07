import React, { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import s from "./search.module.scss";

import { useRouter } from "next/router";
import { SearchOutlined } from "@ant-design/icons";
import en from "../../locales/EN/translation.json";
import ru from "../../locales/RU/translation.json";
import de from "../../locales/DE/translation.json";
import ch from "../../locales/CH/translation.json";
import fr from "../../locales/FR/translation.json";
import uk from "../../locales/UK/translation.json";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  searchByCategory,
  searchByCourses,
} from "@/redux/reducers/search.slice";

import MyInput from "@/UI/MyInput/MyInput";
import Categories from "@/components/Categories/Categories";
import Loading from "@/components/Loading/Loading";
import CoursesList from "@/components/CoursesList/CoursesList";

const Search: FC = () => {
  const [token, setToken] = useState("");
  const [mainState, setMainState] = useState(true);
  const [state, setState] = useState(false);
  const { locale } = useRouter();
  let t: any;
  switch (locale) {
    case "en":
      t = en;
      break;
    case "de":
      t = de;
      break;
    case "ch":
      t = ch;
      break;
    case "fr":
      t = fr;
      break;
    case "uk":
      t = uk;
      break;
    default:
      t = ru;
      break;
  }  const dispatch = useAppDispatch();

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, []);

  const { resultByCategory, courseResults, isLoading } = useAppSelector(
    (state) => state.search
  );

  const handleSearch = (value: string) => {
    setState(true);
    // setMainState(false);
    dispatch(searchByCategory({ value, token }));
    dispatch(searchByCourses({ value, token }));
    // if (resultByCategory.length === 0 && courseResults.length === 0) {
    //   setState(false);
    // }
    // if (Array.isArray(resultByCategory) && Array.isArray(courseResults)) {
    //   setState(false);
    // }
    // if (resultByCategory.length === 0 && Array.isArray(courseResults)) {
    //   setState(false);
    // }
    // if (Array.isArray(resultByCategory) && courseResults.length === 0) {
    //   setState(false);
    // }
  };

  return (
    <section className={s.search}>
      <h2>{t.search[0]}</h2>
      <MyInput
        className={s.search__input}
        prefix={<SearchOutlined />}
        placeholder={t.search[1]}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleSearch(e.target.value)
        }
      />
      {state === true ? (
        isLoading ? (
          <Loading />
        ) : (
          <>
            <h2>Результаты по категориям</h2>
            {Array.isArray(resultByCategory) &&
            resultByCategory.length !== 0 ? (
              <Categories categories={resultByCategory} />
            ) : (
              <p className={s.search__text}>
                По вашему запросу нечего не найдено(
              </p>
            )}

            <h2>Результаты по курсам</h2>
            {Array.isArray(courseResults) && courseResults.length !== 0 ? (
              <CoursesList courses={courseResults} />
            ) : (
              <p className={s.search__text}>
                По вашему запросу нечего не найдено(
              </p>
            )}
          </>
        )
      ) : (
        <p className={s.search__text}>Нечего не найдено(</p>
      )}
    </section>
  );
};

export default Search;
