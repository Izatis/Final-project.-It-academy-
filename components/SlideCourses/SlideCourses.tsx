import React, { FC } from "react";
import s from "./SlideCourses.module.scss";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Keyboard } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import MyButton from "../UI/Buttons/MyButton/MyButton";
import slideFirst from "../../public/slideFirst.jpg";
import { courses } from "@/constants/courses";

const SlideCourses: FC = () => {
  return (
    <section className={s.slideCourses}>
      <h2>Курсы</h2>

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
