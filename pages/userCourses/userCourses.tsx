import React, { useEffect, useState } from "react";
import s from "./userCourses.module.scss";

import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getAllUserCourses } from "@/redux/reducers/user.slice";

import MyButton from "@/UI/Buttons/MyButton/MyButton";
import Loading from "@/components/Loading/Loading";
import CoursesList from "@/components/CoursesList/CoursesList";
import { useGetUserQuery } from "@/redux/reducers/user";

const UserCourse = () => {
  const [token, setToken] = useState("");
  const dispatch = useAppDispatch();
  const { data: user = {} } = useGetUserQuery({ token });
  const userId = user.id;

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, []);

  useEffect(() => {
    dispatch(getAllUserCourses({ token, userId }));
  }, []);

  return (
    <section className={s.userCourses}>
      <div className={s.addingCourse}>
        <p>У вас нету курсов</p>
        <Link href="/addingCourse/addingCourse">
          <MyButton
            background="#7329c2"
            hoverBackground="#03d665"
            type="primary"
          >
            Нажмите чтобы создать
          </MyButton>
        </Link>
      </div>
      {/* <CoursesList courses={userCourses} /> */}
    </section>
  );
};

export default UserCourse;
