import React from "react";
import s from "./addingCategory.module.scss";

import Link from "next/link";
import Image from "next/image";
import { ICategory } from "@/redux/types/category";
import { categories } from "@/constants/categories";

const AddingCategory = () => {
  return (
    <div className={s.categories__wrap}>
      {categories.map((category: ICategory) => {
        return (
          <Link
            className={s.categories__card}
            href={`/setting/addition/addingCourse/${category.id}`}
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

export default AddingCategory;
