import React, { FC, useEffect, useState } from "react";
import s from "./Categories.module.scss";

import Link from "next/link";
import Image from "next/image";
import { useGettingACategoryQuery } from "@/redux/reducers/category";

const Categories: FC = () => {
    const [token, setToken] = useState("");
  const { data = [] } = useGettingACategoryQuery(token);

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, []);

  return (
    <section className={s.categories} id="categories">
      <h2>Категории</h2>
      <div className={s.categories__wrap}>
        {data.map((category: any) => {
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
