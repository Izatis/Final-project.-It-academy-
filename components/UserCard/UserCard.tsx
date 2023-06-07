import React, { FC, useEffect, useState } from "react";
import s from "./UserCard.module.scss";

import Link from "next/link";
import Image from "next/image";
import { notification } from "antd";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IUser } from "@/redux/types/user";
import {
  useDeletingAUserMutation,
  useGetCurrentUserQuery,
} from "@/redux/reducers/user";

import Rating from "../Rating/Rating";
import Loading from "../Loading/Loading";

interface IUserCardProps {
  user: IUser;
}

const UserCard: FC<IUserCardProps> = ({ user }) => {
  const [token, setToken] = useState("");
  const userId = user.id;
  const { data: currentUser = {} } = useGetCurrentUserQuery({ token });

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, []);

  // ---------------------------------------------------------------------------------------------------------------------------------
  // DELETE
  const [deletingAUser, { isLoading }] = useDeletingAUserMutation();

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: any) => {
    api.info({
      message: `Аккаунт успешно удалён!`,
      placement,
    });
  };

  const handleDeletingAUser = async () => {
    await deletingAUser({ userId, token }).unwrap();
    openNotification(5);
  };

  return (
    <Link className={s.user} href={`/userProfile/${user.id}`} key={user.id}>
      {contextHolder}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className={s.user__introduction}>
            <div className={s.user__info}>
              <Image
                src={user.imageUrl}
                alt={user.imageName}
                width={200}
                height={100}
              />
              <ul className={s.user__list}>
                <li className={s.user__fullName}>{user.fullName}</li>
                <li className={s.user__email}>{user.email}</li>
                <li className={s.user__description}>{user.dateOfBirth}</li>
                <li className={s.user__rating}>
                  <pre>4,8</pre> <Rating value={1} />
                </li>
                {/* <li className={s.user__item}>{user.reviews} отзывов</li>
          <li className={s.user__item}>{user.numberOfCourses} курса</li> */}
              </ul>
            </div>
            {currentUser.role === "ROLE_ADMIN" && (
              <div
                className={s.user__trash}
                onClick={(e) => e.preventDefault()}
              >
                <FontAwesomeIcon icon={faTrash} onClick={handleDeletingAUser} />
              </div>
            )}
          </div>
          <b className={s.user__title}>Немного о себе:</b>
        </>
      )}
    </Link>
  );
};

export default UserCard;
