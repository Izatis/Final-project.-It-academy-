import React, { FC, useEffect, useState } from "react";
import s from "./UserCard.module.scss";

import Link from "next/link";
import Image from "next/image";
import cn from "classnames";
import { notification } from "antd";
import {
  useGetCurrentUserQuery,
  useBlockingAUserMutation,
  useUserUnlockMutation,
} from "@/redux/reducers/user";
import { IUser } from "@/redux/types/user";

import Rating from "../Rating/Rating";
import Loading from "../Loading/Loading";

interface IUserCardProps {
  user: IUser;
}

const UserCard: FC<IUserCardProps> = ({ user }) => {
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const userId = user.id;
  const { data: currentUser = {} } = useGetCurrentUserQuery({ token });

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, []);

  const [changeMessage, setChangeMessage] = useState("");

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: any) => {
    api.info({
      message: `Аккаунт успешно ${changeMessage}`,
      placement,
    });
  };

  // ---------------------------------------------------------------------------------------------------------------------------------
  // POST UNLOCKING
  const [userUnlock, { isLoading: isLoadingUserUnlock }] =
    useUserUnlockMutation();

  useEffect(() => {
    setIsLoading(isLoadingUserUnlock);
  }, [isLoadingUserUnlock]);

  const handleUserUnlock = async (e: any) => {
    e.preventDefault();
    await userUnlock({ userId, token }).unwrap();
    setChangeMessage("разблокирован!");
    openNotification(5);
  };

  // ---------------------------------------------------------------------------------------------------------------------------------
  // POST BLOCKING
  const [blockingAUser, { isLoading: isLoadingBockingAUser }] =
    useBlockingAUserMutation();

  useEffect(() => {
    setIsLoading(isLoadingBockingAUser);
  }, [isLoadingBockingAUser]);

  const handlebBockingAUser = async (e: any) => {
    e.preventDefault();
    await blockingAUser({ userId, token }).unwrap();
    setChangeMessage("заблокирован!");
    openNotification(5);
  };

  return (
    <Link
      className={cn(s.user, user.isActive ? null : s.userDisabled)}
      href={`/userProfile/${user.id}`}
      key={user.id}
    >
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
            {currentUser.role === "ROLE_ADMIN" &&
              (user.isActive ? (
                <span className={s.error} onClick={handlebBockingAUser}>
                  Заблокировать
                </span>
              ) : (
                <span className={s.successfully} onClick={handleUserUnlock}>
                  Разблокировать
                </span>
              ))}
          </div>
          <b className={s.user__title}>Немного о себе:</b>
        </>
      )}
    </Link>
  );
};

export default UserCard;
