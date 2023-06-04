import React from "react";
import s from "./addAnotherSection.module.scss";
import MyButton from "@/UI/Buttons/MyButton/MyButton";
import Link from "next/link";

const addAnotherSection = () => {
  return (
    <section className={s.addAnotherSection}>
      <h1>Хотите ещё урок добавить?</h1>
      <div className={s.addAnotherSection__buttons}>
      <Link href="/addingLesson/addingLesson">
        <MyButton background="#03d665" hoverBackground="#7329c2" type="primary">
          Да
        </MyButton>
      </Link>
      <Link href="/">
        <MyButton background="#03d665" hoverBackground="#7329c2" type="primary">
          Нет
        </MyButton>
      </Link>
      </div>
    </section>
  );
};

export default addAnotherSection;
