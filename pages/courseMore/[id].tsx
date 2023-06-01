import { useEffect, useState } from "react";
import s from "./courseMore.module.scss";

import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  gettingACourse,
  receiveCourseSections,
} from "@/redux/reducers/course.slice";

import Rating from "@/components/Rating/Rating";
import AnimateSelect from "@/components/UI/AnimateSelect/AnimateSelect";
import MyButton from "@/components/UI/Buttons/MyButton/MyButton";
import TeacherCard from "@/components/TeacherCard/TeacherCard";
import ReviewCard from "@/components/ReviewCard/ReviewCard";
import Loading from "@/components/Loading/Loading";

export default function () {
  // Состояние - для модалки
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { query }: { query: any } = useRouter();

  const dispatch = useAppDispatch();
  const { course, isLoading } = useAppSelector(
    (state) => state.course
  );

  useEffect(() => {
    // Достаем токен пользователя
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);

    const id = query.id;
    // Отправляем get запрос для разделa курса
    dispatch(gettingACourse({ id, parsedToken }));

    // Отправляем get запрос для получение курсов
    dispatch(receiveCourseSections({ id, parsedToken }));
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={s.course}>
          <aside>
            <div
              className={s.course__poster}
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              <FontAwesomeIcon className={s.course__play} icon={faCirclePlay} />
              <span>Просмотреть этот курс</span>
              <Image
                src={course.imageUrl}
                alt="poster"
                width={200}
                height={200}
              />

              <div className={s.blackout}></div>
            </div>

            <div className={s.aside__body}>
              <span className={s.aside_price}>{course.price} $</span>
              <MyButton className={s.aside__button}>
                Добавить в корзину
              </MyButton>

              <Link href={`/payment/${course.id}`}>
                <MyButton className={s.aside__subButton}>
                  Купить сейчас
                </MyButton>
              </Link>
              <b>Этот курс включает:</b>

              <ul className={s.aside__list}>
                <li>66,5 ч видео по запросу</li>
                <li>22 упражнений по написанию кода</li>
                <li>2 практических тестов</li>
                <li>8 статей</li>
                <li>80 ресурсов для скачивания</li>
                <li>Доступ через мобильные устройства и телевизор</li>
                <li>Полный пожизненный доступ</li>
                <li>Сертификат об окончании</li>
              </ul>
            </div>
          </aside>

          <div className={s.right__block}>
            <ul className={s.course__list}>
              <li className={s.course__title}>{course.name}</li>
              <li className={s.course__creator}>Авторы: Иван Петриченко</li>
              <li className={s.course__rating}>
                <pre>400</pre> <Rating value={3.5} />
              </li>
              <li className={s.course__duration}>
                Дата создания: {course.created}
              </li>
              <li className={s.course__language}> {course.language}</li>
            </ul>

            <div className={s.course__info}>
              <b>Чему вы научитесь</b>

              <ul className={s.info__list}>
                <li>{course.description}</li>
              </ul>
            </div>

            <div className={s.course__materials}>
              <b>Материалы курса</b>

              <AnimateSelect
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            </div>

            <TeacherCard />

            <ReviewCard />
          </div>
        </div>
      )}
    </>
  );
}
