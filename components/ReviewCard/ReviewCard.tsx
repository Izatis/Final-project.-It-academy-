import React, { FC, useEffect, useState } from "react";
import s from "./ReviewCard.module.scss";

import Image from "next/image";
import Rating from "../Rating/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { useGetReviwsQuery } from "@/redux/reducers/review";
import { useRouter } from "next/router";

interface IReview {
  id: number;
  title: string;
  avatar: string;
  grade: number;
  description: string;
}

const ReviewCard: FC = () => {
  const [token, setToken] = useState("");
  const { query }: { query: any } = useRouter();
  const courseId = query.id;

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, []);

  const { data = [] } = useGetReviwsQuery({ token, courseId });
  console.log(data);
  
  return (
    <article className={s.reviewCards}>
      <h2>
        <FontAwesomeIcon className={s.reviewCard__icon} icon={faStar} /> Оценок
        курса: 4,5 2K оценки
      </h2>

      <div className={s.reviewCard__wrap}>
        {data.map((rewiew: IReview) => {
          return (
            <div className={s.reviewCard} key={rewiew.id}>
              <header className={s.reviewCard__avatar}>
                {/* <Image
                  src={rewiew.avatar}
                  alt="avatar"
                  width={300}
                  height={200}
                /> */}

                <ul className={s.reviewCard__list}>
                  <li className={s.reviewCard__fullName}>{rewiew.title}</li>
                  <li className={s.reviewCard__rating}>
                    <pre>{rewiew.grade}</pre>
                    <Rating value={rewiew.grade} />
                  </li>
                </ul>
              </header>
              <p>{rewiew.description}</p>
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
