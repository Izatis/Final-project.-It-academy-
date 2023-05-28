import React, { FC } from "react";
import s from "./Categories.module.scss";

import Link from "next/link";
import Image from "next/image";
import { categories } from "@/constants/categories";

const Categories: FC = () => {
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
              <h2>{category.name}</h2>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
