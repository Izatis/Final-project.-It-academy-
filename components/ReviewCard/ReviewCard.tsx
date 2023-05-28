import React, { FC } from "react";
import s from "./ReviewCard.module.scss";

import Image from "next/image";
import Rating from "../Rating/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

interface IReview {
  id: number;
  fullName: string;
  avatar: string;
  rating: number;
  rewiew: string;
}

const rewiews: IReview[] = [
  {
    id: 1,
    fullName: "Альгасов Александр",
    avatar:
      "https://images.squarespace-cdn.com/content/v1/5cd4eaf58d974051df3fe898/1680603773142-CXT03T3ZFXC6QPPNVQ1D/Home+Page+Photo.jpeg?format=2500w",
    rating: 4.5,
    rewiew:
      "Курс отличный. Доступно и понятно изложен материал. И на мой взгляд важно, что он не перегружен избытком информации. Дз разбавляет теоретическую часть. Советую !",
  },
  {
    id: 2,
    fullName: "Альгасов Александр",
    avatar:
      "https://images.squarespace-cdn.com/content/v1/5cd4eaf58d974051df3fe898/1680603773142-CXT03T3ZFXC6QPPNVQ1D/Home+Page+Photo.jpeg?format=2500w",
    rating: 4.5,
    rewiew:
      "Курс отличный. Доступно и понятно изложен материал. И на мой взгляд важно, что он не перегружен избытком информации. Дз разбавляет теоретическую часть. Советую !",
  },
];
const ReviewCard: FC = () => {
  return (
    <article className={s.reviewCards}>
      <h2>
        <FontAwesomeIcon className={s.reviewCard__icon} icon={faStar} /> Оценок
        курса: 4,5 2K оценки
      </h2>

      <div className={s.reviewCard__wrap}>
        {rewiews.map((rewiew) => {
          return (
            <div className={s.reviewCard} key={rewiew.id}>
              <header className={s.reviewCard__avatar}>
                <Image
                  src={rewiew.avatar}
                  alt="avatar"
                  width={300}
                  height={200}
                />

                <ul className={s.reviewCard__list}>
                  <li className={s.reviewCard__fullName}>{rewiew.fullName}</li>
                  <li className={s.reviewCard__rating}>
                    <pre>{rewiew.rating}</pre>
                    <Rating value={rewiew.rating} />
                  </li>
                </ul>
              </header>
              <p>{rewiew.rewiew}</p>
              <footer>
                <span>
                  <pre>Это было полезно?</pre>
                  <span>
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#03d655" }}
                    />
                    <FontAwesomeIcon
                      icon={faThumbsDown}
                      bounce
                      style={{ color: "#ff4d4f" }}
                    />
                  </span>
                </span>
              </footer>
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default ReviewCard;
