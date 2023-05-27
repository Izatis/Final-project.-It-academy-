import React, { FC } from "react";
import s from "./BasketItem.module.scss";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";

import Rating from "../Rating/Rating";

interface IBaskets {
  basket: {
    id: number;
    title: string;
    creator: string;
    price: number;
  };
}

const BasketItem: FC<IBaskets> = ({ basket }) => {
  return (
    <Link className={s.basket__link} href={`/courseMore/${basket.id}`}>
      <div className={s.basket__image}>
        <Image
          src={
            "https://img.freepik.com/premium-photo/word-design-written-top-colorful-geometric-3d-shapes_2227-1663.jpg"
          }
          alt="poster"
          width={300}
          height={200}
        />

        <div className={s.blackout}>
          <span>Нажмите</span>
        </div>
      </div>

      <div className={s.basket__info}>
        <ul className={s.content__list}>
          <li className={s.basket__title}>{basket.title}</li>
          <li className={s.basket__creator}>Автор: {basket.creator}</li>
          <li className={s.basket__rating} onClick={(e) => e.preventDefault()}>
            <pre>{basket.price}</pre>
            <Rating value={2.5} />
          </li>
          <li className={s.basket__duration}>{basket.price}</li>
        </ul>

        <span className={s.basket__price}>{basket.price} $</span>
        
        <FontAwesomeIcon
          className={s.basket__trash}
          icon={faTrash}
          onClick={(e) => e.preventDefault()}
        />
        <FontAwesomeIcon
          className={s.basket__heart}
          icon={faHeart}
          onClick={(e) => e.preventDefault()}
        />
      </div>
    </Link>
  );
};

export default BasketItem;
