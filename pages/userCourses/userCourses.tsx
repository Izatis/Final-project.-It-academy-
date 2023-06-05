import React, { useEffect, useState } from "react";
import s from "./userCourses.module.scss";

import Link from "next/link";

import MyButton from "@/UI/Buttons/MyButton/MyButton";
import Loading from "@/components/Loading/Loading";
import CoursesList from "@/components/CoursesList/CoursesList";
import { useGetUserQuery } from "@/redux/reducers/user";
import { useGetUserCoursesQuery } from "@/redux/reducers/course/course";

const UserCourse = () => {
  const [token, setToken] = useState("");
  const { data: user = {}, isLoading } = useGetUserQuery({ token });
  const userId = user.id;

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") || "");
    setToken(parsedToken);
  }, []);

  const { data: userCourses = [] } = useGetUserCoursesQuery({ token, userId });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className={s.userCourses}>
          {userCourses.length !== 0 ? (
            <CoursesList courses={userCourses} />
          ) : (
            <div className={s.addingCourse}>
              <p>У вас нет курсов</p>
              <Link href="/addition/addingCourse/addingCourse">
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
        </section>
      )}
    </>
  );
};

export default UserCourse;
