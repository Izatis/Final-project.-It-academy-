import React, { useEffect, useState } from "react";
import s from "./purchasedUserCourses.module.scss";

import Link from "next/link";
import { useReceivingPurchasedCoursesQuery } from "@/redux/reducers/subscription";

import Loading from "@/components/Loading/Loading";
import CoursesList from "@/components/CoursesList/CoursesList";

const MyPurchasedCourses = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") || "");
    setToken(parsedToken);
  }, []);

  const { data: purchasedUserCourses = [], isLoading } =
    useReceivingPurchasedCoursesQuery({
      token,
    });

  return (
    <section className={s.userCourses}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {purchasedUserCourses.length !== 0 ? (
            <div>
              <b>Мои купленные курсы</b>
              <CoursesList courses={purchasedUserCourses} />
            </div>
          ) : (
            <div className={s.addingCourse}>
              <b>У вас нет купленных курсов</b>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default MyPurchasedCourses;
