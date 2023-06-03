import React, { useEffect, useState } from "react";
import s from "./CardSlides.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Keyboard } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import Link from "next/link";
import { gettingAllCourses } from "@/redux/reducers/course.slice";
import Image from "next/image";
import Rating from "../Rating/Rating";
import { useGetingAllCoursesQuery } from "@/redux/reducers/course";

const CardSlides = () => {
  const [token, setToken] = useState("");

  // // ---------------------------------------------------------------------------------------------------------------------------------
  const { data = [], isLoading } = useGetingAllCoursesQuery(token);
  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
    console.log(data);
  }, []);

  return (
    <section className={s.cards}>
      <h2>Курсы</h2>
      <Swiper
        slidesPerView={4}
        speed={1200}
        autoplay={{
          delay: 4500,
        }}
        centeredSlides={true}
        spaceBetween={-200}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        keyboard={{
          enabled: true,
        }}
        loop={true}
        grabCursor={true}
        modules={[Navigation, Autoplay, Keyboard]}
        className="card-slides"
      >
        {data.map((course: any) => {
          return (
            <SwiperSlide key={course.id}>
              <Link className={s.card__link} href={`/courseMore/${course.id}`}>
                <div className={s.card__image}>
                  <Image
                    src={course.imageUrl}
                    alt="slides image"
                    width={200}
                    height={100}
                  />

                  <div className={s.blackout}>
                    <span>Нажмите</span>
                  </div>
                </div>
                <ul className={s.card__info}>
                  <li className={s.card__title}>{course.name}</li>
                  <li className={s.card__creator}>Автор: {course.author}</li>
                  <li
                    className={s.card__rating}
                    onClick={(e) => e.preventDefault()}
                  >
                    <pre>{course.price}</pre>
                    <Rating value={course.price} />
                  </li>
                  <li className={s.card__price}>{course.price} $</li>
                </ul>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default CardSlides;
