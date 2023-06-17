import React, { useEffect, useState } from "react";
import s from "./Main.module.scss";

import { motion } from "framer-motion";
import { useGettingACategoryQuery } from "@/redux/reducers/category";

import { useRouter } from "next/router";
import en from "../../locales/EN/translation.json";
import ru from "../../locales/RU/translation.json";
import de from "../../locales/DE/translation.json";
import ch from "../../locales/CH/translation.json";
import fr from "../../locales/FR/translation.json";
import uk from "../../locales/UK/translation.json";

import Hero from "@/components/Hero/Hero";
import Statistics from "@/components/Statistics/Statistics";
import CourseCardSlide from "@/components/CourseCardSlide/CourseCardSlide";
import Categories from "@/components/Categories/Categories";
import SlideCourses from "@/components/SlideCourses/SlideCourses";
import ModelComponent from "@/components/3dModel/3dModel";

const Main = () => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, []);
  const { data: categories = [] } = useGettingACategoryQuery({ token });
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
  }  return (
    <>
      <Hero />
      <Statistics />
      <CourseCardSlide />
      <motion.section
        id="categories"
        className={s.categories}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1 }}
        variants={{
          visible: { opacity: 1, x: 0 },
          hidden: { opacity: 0, x: 100 },
        }}
      >
        <h2> {t.main[3]}</h2>
        <Categories categories={categories} />
      </motion.section>
      <ModelComponent />
      <SlideCourses />
    </>
  );
};

export default Main;
