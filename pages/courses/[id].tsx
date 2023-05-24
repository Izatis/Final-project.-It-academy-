import Rating from "@/components/Rating/Rating";
import s from "./courses.module.scss";

import { useState } from "react";
import { cards, ICards } from "../../constants/cardData";

export default function () {
  // Состояние - для карточек
  const [cardsData, setCardsData] = useState<ICards[]>(cards);
  return (
    <section className={s.courses}>
      <aside></aside>

      <ul className={s.hero__list}>
        <li>
          <h2>Полный курс по JavaScript + React - с нуля до результата</h2>
        </li>
        <li className={s.courses__desciption}>
          Освойте самый популярный язык программирования - JavaScript,
          библиотеку React и научись применять на практике!
        </li>
        <li>
          <Rating value={3.5} />
        </li>
        <li className={s.card__creator}>Авторы: Иван Петриченко</li>
        <li className={s.courses__duration}>Последнее обновление: 03.2023</li>
        <li>Russia</li>
      </ul>
      <div></div>
    </section>
  );
}
