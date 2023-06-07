import React, { useEffect, useState } from "react";
import s from "./userCourses.module.scss";

import Link from "next/link";

import MyButton from "@/UI/Buttons/MyButton/MyButton";
import Loading from "@/components/Loading/Loading";
import CoursesList from "@/components/CoursesList/CoursesList";
import { useGetCurrentUserQuery } from "@/redux/reducers/user";
import { useGetUserCoursesQuery } from "@/redux/reducers/course/course";

const UserCourse = () => {
  const [token, setToken] = useState("");
  const { data: userCurrent = {}, isLoading: isLoadingUserCurrent } =
    useGetCurrentUserQuery({ token });
  const userId = userCurrent.id;

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") || "");
    setToken(parsedToken);
  }, []);

  const { data: userCourses = [], isLoading: isLoadingUserCourses } =
    useGetUserCoursesQuery({ token, userId });

  return (
    <section className={s.userCourses}>
      {isLoadingUserCurrent || isLoadingUserCourses ? (
        <Loading />
      ) : (
        <>
          {userCourses.length !== 0 ? (
            <div>
              <b>Мои курсы</b>
              <CoursesList courses={userCourses} />
            </div>
          ) : (
            <div className={s.addingCourse}>
              <p>У вас нету курсов</p>
              <Link href="/addition/addingCourse">
                <MyButton
                  background="#7329c2"
                  hoverBackground="#03d665"
                  type="primary"
                >
                  Нажмите, чтобы создать
                </MyButton>
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default UserCourse;
