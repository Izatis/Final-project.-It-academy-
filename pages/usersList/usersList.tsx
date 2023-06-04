import React, { useEffect, useState } from "react";
import s from "./usersList.module.scss";

import { useGetAllUsersQuery } from "@/redux/reducers/user";
import { IUser } from "@/redux/types/user";

import UserCard from "@/components/UserCard/UserCard";
import Loading from "@/components/Loading/Loading";

const UsersList = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, []);

  const { data: users = [], isLoading } = useGetAllUsersQuery({ token });

  return (
    <ul className={s.users__list}>
      {isLoading ? (
        <Loading />
      ) : (
        users.map((user: IUser) => {
          return <UserCard user={user} />;
        })
      )}
    </ul>
  );
};

export default UsersList;
