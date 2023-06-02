import React from "react";
import s from "./MyButton.module.scss";

const Successfully = () => {
  return (
    <section className={s.successfully}>
      <h2 className={s.page_title}>
        Ваш ответ успешно записан! Мы вам перезвоним!
      </h2>
      <a href="./index.html">
        <button className={s.successfully__button}>
          <span>Вернуться на главную</span>
        </button>
      </a>
    </section>
  );
};

export default Successfully;
