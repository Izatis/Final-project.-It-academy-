import React, { FC } from "react";
import s from "./SlideCourses.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Keyboard } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import en from "../../locales/EN/translation.json";
import ru from "../../locales/RU/translation.json";
import de from "../../locales/DE/translation.json";
import ch from "../../locales/CH/translation.json";
import fr from "../../locales/FR/translation.json";
import uk from "../../locales/UK/translation.json";

import MyButton from "../../UI/Buttons/MyButton/MyButton";
import slideFirst from "../../public/slideFirst.jpg";
import { courses } from "@/constants/courses";

const SlideCourses: FC = () => {
  const { locale } = useRouter();
  let t: any;
  switch (locale) {
    case "en":
      t = en;
      break;
    case "de":
      t = de;
      break;
    case "ch":
      t = ch;
      break;
    case "fr":
      t = fr;
      break;
    case "uk":
      t = uk;
      break;
    default:
      t = ru;
      break;
  }
  return (
    <section className={s.slideCourses}>
      <motion.h2
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1 }}
        variants={{
          visible: { opacity: 1, x: 0 },
          hidden: { opacity: 0, x: 100 },
        }}
      >
        {t.main[5]}
      </motion.h2>

      <Swiper
        speed={1200}
        autoplay={{
          delay: 4500,
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        keyboard={{
          enabled: true,
        }}
        loop={true}
        grabCursor={true}
        modules={[Navigation, Pagination, Autoplay, Keyboard]}
        className="course-slides"
        id="courses"
      >
        {courses.map((course) => {
          return (
            <SwiperSlide key={course.id}>
              <div className={s.mySwiper__content}>
                <div className={s.mySwiper__info}>
                  <b>
                    <span>Курс</span> Java
                  </b>
                  <p>{course.description}</p>
                  <Link href={`/courseMore/${course.id}`}>
                    <MyButton className={s.mySwiper__button}>Перейти</MyButton>
                  </Link>
                </div>

                <Image src={slideFirst} alt="slide image" />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default SlideCourses;
