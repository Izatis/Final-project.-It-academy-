import React, { FC } from "react";
import s from "./CategoriesList.module.scss";

import Link from "next/link";
import Image from "next/image";
import { categories } from "@/constants/categories";

const CategoriesList: FC = () => {
  return (
    <section className={s.categories} id="categories">
      <h2>Популярные категории</h2>
      <div className={s.categories__list}>
        {categories.map((category) => {
          return (
            <Link
              className={s.categories__item}
              href={`/categories/${category.id}`}
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

export default CategoriesList;
