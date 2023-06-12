import { useEffect, useState } from "react";
import s from "./userProfile.module.scss";

import Image from "next/image";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTelegram } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  useGetUserCoursesQuery,
  useGettingACourseQuery,
} from "@/redux/reducers/course/course";

import CourseList from "@/components/CoursesList/CoursesList";
import { useGetUserQuery } from "@/redux/reducers/user";
import Loading from "@/components/Loading/Loading";

export default function () {
  const [token, setToken] = useState("");
  const { query }: { query: any } = useRouter();
  const courseId = query.id;

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, []);
  // ---------------------------------------------------------------------------------------------------------------------------------
  // GET USER COURSE
  const { data: course = {} } = useGettingACourseQuery({
    token,
    courseId,
  });

  // ---------------------------------------------------------------------------------------------------------------------------------
  // GET CREATOR
  const creatorId = course.authorId;

  const { data: creator = {}, isLoading: isLoadingCreator } = useGetUserQuery({
    token,
    creatorId,
  });

  // ---------------------------------------------------------------------------------------------------------------------------------
  // GET USER COURSES

  const userId = creator.id;
  const { data: userCourses = [], isLoading: isLoadingUserCourses } =
    useGetUserCoursesQuery({ token, userId });

  return (
    <section className={s.userProfile}>
      {isLoadingUserCourses || isLoadingCreator ? (
        <Loading />
      ) : (
        <>
          <div className={s.userProfile__info}>
            <div className={s.userProfile__introduction}>
              <div className={s.userProfile__flex}>
                <Image
                  className={s.userProfile__avatar}
                  src={creator.imageUrl}
                  alt="avatar"
                  width={300}
                  height={200}
                />

                <ul className={s.userProfile__list}>
                  <li className={s.userProfile__static}>Преподаватель:</li>
                  <li className={s.userProfile__fullName}>
                    {creator.fullName}
                  </li>
                  <li className={s.userProfile__profession}>
                    Front-End Developer
                  </li>
                  <li className={s.userProfile__dateOfBirth}>
                    {creator.dateOfBirth}
                  </li>
                  <li>
                    <dl>
                      <span>
                        <dt>5</dt>
                        <dd>Отзывов</dd>
                      </span>

                      <span>
                        <dt>10</dt>
                        <dd>Курсов</dd>
                      </span>
                    </dl>
                  </li>
                </ul>
              </div>

              <ul className={s.userProfile__socialMedia}>
                <li>
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon
                      className={s.userProfile__social}
                      icon={faInstagram}
                    />
                  </a>
                </li>
                <li>
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon
                      className={s.userProfile__social}
                      icon={faPhone}
                    />
                  </a>
                </li>
                <li>
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon
                      className={s.userProfile__social}
                      icon={faTelegram}
                    />
                  </a>
                </li>
              </ul>
            </div>

            <b className={s.userProfile__title}>Немного о себе:</b>
            <p className={s.userProfile__description}>
              Добрый день! Меня зовут Петриченко Иван. Уже более 7 лет занимаюсь
              Front-End разработкой. Я создаю сайты и веб-приложения под ключ,
              обучаю этому взрослых и детей, организовываю и провожу
              мероприятия, занимаюсь консалтингом и аудитом.
            </p>
          </div>

          <h2>Курсы</h2>

          <CourseList courses={userCourses} />
        </>
      )}
    </section>
  );
}
