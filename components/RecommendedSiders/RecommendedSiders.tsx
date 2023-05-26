import React, { FC } from "react";
import s from "./RecommendedSiders.module.scss";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Keyboard } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import MyButton from "../MUI/Buttons/MyButton/MyButton";
import slideFirst from "../../public/slideFirst.jpg";
import slideSecond from "../../public/slideSecond.png";
import Link from "next/link";
import { courses } from "@/constants/courses";

const RecommendedSiders: FC = () => {
  return (
    <section className={s.recommendations} id="recommendations">
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
        className="mySwiper"
      >
        {courses.map((course) => {
          return (
            <SwiperSlide>
              <div className={s.mySwiper__content}>
                <div className={s.mySwiper__info}>
                  <b>
                    <span>Курс</span> Java
                  </b>
                  <p>{course.description}</p>
                  <Link href={`/courses/${course.id}`}>
                    <MyButton>Перейти</MyButton>
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

export default RecommendedSiders;
