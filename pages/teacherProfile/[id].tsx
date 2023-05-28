import { useEffect, useState } from "react";
import s from "./teacherProfile.module.scss";

import Image from "next/image";
import { useRouter } from "next/router";
import { teachers } from "@/components/TeacherCard/TeacherCard";
import { courses } from "@/constants/courses";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTelegram } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

import CourseItem from "@/components/CourseItem/CourseItem";

export default function () {
  // Состояние - для данных учителя
  const [teacher, setTeacher] = useState<any>({});

  const { query }: { query: any } = useRouter();

  // Получает объект из массива categories
  useEffect(() => {
    if (!!query.id) {
      const teacher = teachers.find(({ id }) => id === +query.id);
      setTeacher(teacher);
    }
  }, []);
  return (
    <section className={s.teacher}>
      <div className={s.teacher__info}>
        <div className={s.teacher__introduction}>
          <div className={s.teacher__flex}>
            <Image
              className={s.teacher__avatar}
              src={
                "https://images.squarespace-cdn.com/content/v1/5cd4eaf58d974051df3fe898/1680603773142-CXT03T3ZFXC6QPPNVQ1D/Home+Page+Photo.jpeg?format=2500w"
              }
              alt="avatar"
              width={300}
              height={200}
            />

            <ul className={s.teacher__list}>
              <li className={s.teacher__static}>Преподаватель:</li>
              <li className={s.teacher__fullName}>Andrew Chudlya</li>
              <li className={s.teacher__profession}>Front-End Developer</li>
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

          <ul className={s.teacher__socialMedia}>
            <li>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  className={s.teacher__social}
                  icon={faInstagram}
                />
              </a>
            </li>
            <li>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon className={s.teacher__social} icon={faPhone} />
              </a>
            </li>
            <li>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  className={s.teacher__social}
                  icon={faTelegram}
                />
              </a>
            </li>
          </ul>
        </div>

        <b className={s.teacher__title}>Немного о себе:</b>
        <p className={s.teacher__description}>
          Добрый день! Меня зовут Петриченко Иван. Уже более 7 лет занимаюсь
          Front-End разработкой. Я создаю сайты и веб-приложения под ключ,
          обучаю этому взрослых и детей, организовываю и провожу мероприятия,
          занимаюсь консалтингом и аудитом.
        </p>
      </div>

      <h2>Мои курсы</h2>

      {courses.map((course) => {
        return <CourseItem course={course} />;
      })}
    </section>
  );
}
