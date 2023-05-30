import React, { Suspense, useEffect } from "react";
import s from "./Main.module.scss";


import Hero from "@/components/Hero/Hero";
import Statistics from "@/components/Statistics/Statistics";
import Categories from "@/components/Categories/Categories";
import СourseSlides from "@/components/СourseSlides/СourseSlides";
import ModelComponent from "@/components/3dmodel/3dmodel";
import { fetchUser } from "@/redux/reducers/user.slice";
import { useAppDispatch } from "@/hooks/redux";


const Main = () => {
  const dispatch = useAppDispatch();

  // Отправляет get запрос для получения пользователя
  const getUser = () => {
    // Достаем токен пользователя
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);

    dispatch(fetchUser(parsedToken));
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Hero />
      <Statistics />
      <Categories />
      <СourseSlides />
      {/* <ModelComponent/> */}
    </>
  );
};

export default Main;
