import React, { useEffect } from "react";
import s from "./UsersList.module.scss";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchUsers } from "@/redux/reducers/user.slice";

import Loading from "@/components/Loading/Loading";

const UsersList = () => {
  const dispatch = useAppDispatch();
  const { users, isLoading } = useAppSelector((state) => state.user);

  // Отправляет get запрос для получения пользователя
  const getUser = () => {
    // Достаем токен пользователя
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);

    dispatch(fetchUsers(parsedToken));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <ul className={s.users__list}>
      {isLoading ? (
        <Loading />
      ) : (
        users.map((user) => {
          return <li>
            <div>
              {/* <Avatar */}
            </div>
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </li>;
        })
      )}
    </ul>
  );
};

export default UsersList;
