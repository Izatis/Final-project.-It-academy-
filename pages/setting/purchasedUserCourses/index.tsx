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

  const { data: userCourses = [], isLoading } = useReceivingPurchasedCoursesQuery({
    token,
  });

  return (
    <section className={s.userCourses}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {userCourses.length !== 0 ? (
            <div>
              <b>Мои купленные курсы</b>
              <CoursesList courses={userCourses} />
            </div>
          ) : (
            <div className={s.addingCourse}>
              <b>У вас нет купленных курсов</b>
              {/* <Link href="/courseMore">
                <MyButton
                  background="#7329c2"
                  hoverBackground="#03d665"
                  type="primary"
                >
                  Нажмите, чтобы купить курс
                </MyButton>
              </Link> */}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default MyPurchasedCourses;
