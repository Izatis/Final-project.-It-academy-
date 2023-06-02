import React, { useEffect } from "react";
import s from "./Main.module.scss";

import Hero from "@/components/Hero/Hero";
import Statistics from "@/components/Statistics/Statistics";
import Categories from "@/components/Categories/Categories";
import СourseSlides from "@/components/СourseSlides/СourseSlides";
import ModelComponent from "@/components/3dmodel/3dmodel";
import CardSlides from "@/components/CardSlides/CardSlides";

const Main = () => {
  return (
    <>
      <Hero />
      <Statistics />
      <CardSlides />
      <Categories />
      <СourseSlides />
      <ModelComponent />
    </>
  );
};

export default Main;
