import React, { FC, useEffect } from "react";
import s from "./Categories.module.scss";

import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { gettingACategory } from "@/redux/reducers/category.slice";

const Categories: FC = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);  

  // ---------------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);    
    dispatch(gettingACategory({parsedToken}));
  }, []);
  
  return (
    <section className={s.categories} id="categories">
      <h2>Категории</h2>
      <div className={s.categories__wrap}>
        {categories.map((category) => {
          return (
            <Link
              className={s.categories__card}
              href={`/coursesList/${category.id}`}
              key={category.id}
            >
              <Image src={category.image} alt="categories image" />
              <h2>{category.title}</h2>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
