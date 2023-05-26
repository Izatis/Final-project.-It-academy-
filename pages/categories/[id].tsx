import React, { useEffect, useState } from "react";
import s from "./categories.module.scss";

import axios from "axios";
import { useRouter } from "next/router";
import { courses, ICourses } from "../../constants/courses";
import { categories } from "@/constants/categories";

import MyButton from "@/components/MUI/Buttons/MyButton/MyButton";
import MySelect from "@/components/MUI/MySelect/MySelect";
import Card from "@/components/Card/Card";

export default function () {
  // Состояние - для карточек
  const [coursesData, setCoursesData] = useState<ICourses[]>(courses);
  // Состояние - для объекта из массива categories
  const [category, setCategory] = useState<any>({});

  const { query } = useRouter();

  // Получает объект из массива categories
  useEffect(() => {
    if (!!query.id) {
      const category = categories.find(({ id }) => id === +query.id);
      setCategory(category);
    }
  }, []);

  // Отправляем get запрос для карточек
  const getCard = async () => {
    const BASE_URL = "http://localhost:8080/course";
    try {
      const response = await axios.get(BASE_URL);

      setCoursesData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCard();
  }, []);
  return (
    <section className={s.card}>
      <h2 className={s.pageTitle}>Все курсы по теме "{category.name}"</h2>

      <header className={s.card__header}>
        <div className={s.filteredButton}>
          <MyButton>Фильтировать</MyButton>

          <MySelect />
        </div>

        <span className={s.result}>{coursesData.length} результата</span>
      </header>

      <ul className={s.card__list}>
        {coursesData.map((card) => (
          <Card card={card} />
        ))}
      </ul>
    </section>
  );
}
