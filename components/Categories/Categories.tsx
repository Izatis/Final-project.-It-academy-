import React, { FC, useEffect, useState } from "react";
import s from "./Categories.module.scss";

import Link from "next/link";
import Image from "next/image";
import { ICategory } from "@/redux/types/category";

interface ICategoriesProps {
  categories: ICategory[];
}

const Categories: FC<ICategoriesProps> = ({ categories }) => {
  return (
    <div className={s.categories__wrap}>
      {categories.map((category: ICategory) => {
        return (
          <Link
            className={s.categories__card}
            href={`/coursesList/${category.id}`}
            key={category.id}
          >
            <Image
              src={category.imageUrl}
              alt={category.imageName}
              width={200}
              height={100}
            />
            <h2>{category.title}</h2>
          </Link>
        );
      })}
    </div>
  );
};

export default Categories;
