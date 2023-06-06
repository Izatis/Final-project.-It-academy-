import React, { useEffect, useState } from "react";
import s from "./allCourses.module.scss";
import { useGetingAllCoursesQuery } from "@/redux/reducers/course/course";

import Loading from "@/components/Loading/Loading";
import CourseItem from "@/components/CoursesList/CoursesList";

const AllCourses = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, []);

  const { data: allCourses = [], isLoading } = useGetingAllCoursesQuery({
    token,
  });
  return (
    <section className={s.allCourses}>
      {isLoading ? <Loading /> : <CourseItem courses={allCourses} />}
    </section>
  );
};

export default AllCourses;
