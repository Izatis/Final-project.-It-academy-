import { useEffect, useState } from "react";
import s from "./userProfile.module.scss";

import Image from "next/image";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTelegram } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "@/hooks/redux";

import CourseItem from "@/components/CoursesList/CoursesList";

export default function () {
  const { courses, isLoading } = useAppSelector((state) => state.course);

  const { query }: { query: any } = useRouter();

  // Получает объект из массива categories

  return (
    <section className={s.userProfile}>
      <div className={s.userProfile__info}>
        <div className={s.userProfile__introduction}>
          <div className={s.userProfile__flex}>
            <Image
              className={s.userProfile__avatar}
              src={
                "https://images.squarespace-cdn.com/content/v1/5cd4eaf58d974051df3fe898/1680603773142-CXT03T3ZFXC6QPPNVQ1D/Home+Page+Photo.jpeg?format=2500w"
              }
              alt="avatar"
              width={300}
              height={200}
            />

            <ul className={s.userProfile__list}>
              <li className={s.userProfile__static}>Преподаватель:</li>
              <li className={s.userProfile__fullName}>Andrew Chudlya</li>
              <li className={s.userProfile__profession}>Front-End Developer</li>
              <li>
                <dl>
                  <span>
                    <dt>5</dt>
                    <dd>Отзывов</dd>
                  </span>

                  <span>
                    <dt>900</dt>
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
                <FontAwesomeIcon className={s.userProfile__social} icon={faPhone} />
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
          обучаю этому взрослых и детей, организовываю и провожу мероприятия,
          занимаюсь консалтингом и аудитом.
        </p>
      </div>

      <h2>Мои курсы</h2>

      {/* {courses.map((course) => {
        return <CourseItem course={course} key={course.id} />;
      })} */}
    </section>
  );
}
