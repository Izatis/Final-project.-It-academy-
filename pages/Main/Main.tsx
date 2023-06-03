import React, { useEffect, useState } from "react";
import s from "./Main.module.scss";

import Hero from "@/components/Hero/Hero";
import Statistics from "@/components/Statistics/Statistics";
import CourseCardSlide from "@/components/CourseCardSlide/CourseCardSlide";
import Categories from "@/components/Categories/Categories";
import SlideCourses from "@/components/SlideCourses/SlideCourses";
import ModelComponent from "@/components/3dmodel/3dmodel";
import { useGettingACategoryQuery } from "@/redux/reducers/category";

const Main = () => {
  const [token, setToken] = useState("");
  const { data: categories = [] } = useGettingACategoryQuery({ token });

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, []);

  return (
    <>
      <Hero />
      <Statistics />
      <CourseCardSlide />
      <section className={s.categories} id="categories">
        <h2>Категории</h2>
        <Categories categories={categories} />
      </section>

      <SlideCourses />
      <ModelComponent />
    </>
  );
};

export default Main;
