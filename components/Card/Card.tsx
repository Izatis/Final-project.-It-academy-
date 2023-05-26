import React, { FC } from "react";
import s from "./Card.module.scss";

import Link from "next/link";
import Image from "next/image";

import Rating from "../Rating/Rating";

interface ICardProps {
  card: {
    id: number;
    name: string;
    description: string;
    creator: string;
    price: number;
  };
}

const Card: FC<ICardProps> = ({ card }) => {
  return (
    <li className={s.card__item} key={card.id}>
      <Link className={s.card__link} href={`/courses/${card.id}`}>
        <div className={s.card__image}>
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

        <div className={s.card__content}>
          <ul className={s.content__list}>
            <li className={s.card__title}>{card.name}</li>
            <li className={s.card__desciption}>{card.description}</li>
            <li className={s.card__creator}>{card.creator}</li>
            <li className={s.card__rating} onClick={(e) => e.preventDefault()}>
              <pre>{card.price}</pre>
              <Rating value={2.5} />
            </li>
            <li className={s.card__duration}>{card.price}</li>
          </ul>

          <span className={s.card__price}>{card.price} $</span>
        </div>
      </Link>
    </li>
  );
};

export default Card;
