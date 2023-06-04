import React, { FC, useEffect, useState } from "react";
import s from "./CreatorCard.module.scss";

import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useGettingACourseQuery } from "@/redux/reducers/course/course";

import Rating from "../Rating/Rating";
import { useGetСreatorQuery } from "@/redux/reducers/user";
import { useAppSelector } from "@/hooks/redux";

interface ICreator {
  id: number;
  fullName: string;
  profession: string;
  avatar: string;
  description: string;
  reviews: number;
  numberOfCourses: number;
}

const CreatorCard: FC = () => {
  const { query }: { query: any } = useRouter();
  const courseId = query.id;
  const [token, setToken] = useState("");

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, []);

  const { data: course = [] } = useGettingACourseQuery({
    token,
    courseId,
  });
  const userId = course.authorId;

  const { data: creator = [] } = useGetСreatorQuery({ userId, token });

  return (
    <Link
      className={s.creator}
      href={`/creatorProfile/${creator.id}`}
      key={creator.id}
    >
      <div className={s.creator__introduction}>
        <Image
          src={creator.imageUrl}
          alt={creator.imageName}
          width={200}
          height={100}
        />

        <ul className={s.creator__list}>
          <li className={s.creator__fullName}>{creator.fullName}</li>
          <li className={s.creator__description}>{creator.email}</li>
          <li className={s.creator__description}>{creator.dateOfBirth}</li>
          <li className={s.creator__rating}>
            <pre>4,8</pre> <Rating value={1} />
          </li>
          <li className={s.creator__item}>{creator.reviews} отзывов</li>
          <li className={s.creator__item}>{creator.numberOfCourses} курса</li>
        </ul>
      </div>
      <b className={s.creator__title}>Немного о себе:</b>
    </Link>
  );
};

export default CreatorCard;
