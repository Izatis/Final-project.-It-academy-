import React, { FC } from "react";
import s from "./UserCard.module.scss";

import Link from "next/link";
import Image from "next/image";
import { IUser } from "@/redux/types/user";

import Rating from "../Rating/Rating";

interface IUserCardProps {
  user: IUser;
}

const UserCard: FC<IUserCardProps> = ({ user }) => {
  return (
    <Link
      className={s.user}
      href={`/userProfile/${user.id}`}
      key={user.id}
    >
      <div className={s.user__introduction}>
        <Image
          src={user.imageUrl}
          alt={user.imageName}
          width={200}
          height={100}
        />

        <ul className={s.user__list}>
          <li className={s.user__fullName}>{user.fullName}</li>
          <li className={s.user__description}>{user.email}</li>
          <li className={s.user__description}>{user.dateOfBirth}</li>
          <li className={s.user__rating}>
            <pre>4,8</pre> <Rating value={1} />
          </li>
          {/* <li className={s.user__item}>{user.reviews} отзывов</li>
          <li className={s.user__item}>{user.numberOfCourses} курса</li> */}
        </ul>
      </div>
      <b className={s.user__title}>Немного о себе:</b>
    </Link>
  );
};

export default UserCard;
