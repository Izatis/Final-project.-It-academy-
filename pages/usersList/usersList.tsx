import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchUsers } from "@/redux/reducers/user.slice";

import Loading from "@/components/Loading/Loading";

const UsersList = () => {
  const dispatch = useAppDispatch();
  const { users, isLoading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      {isLoading && <Loading />}
      {error && <h1>{error}</h1>}
      {JSON.stringify(users, null, 2)}
    </div>
  );
};

export default UsersList;
