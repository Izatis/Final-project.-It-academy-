import { useEffect, useState } from "react";
import s from "./courseMore.module.scss";

import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useGettingACourseQuery } from "@/redux/reducers/course/course";
import { useAddingToCartMutation } from "@/redux/reducers/cart";
import { gettingPartitions } from "@/redux/reducers/section.slice";
import { useGetCreatorQuery } from "@/redux/reducers/user";

import Loading from "@/components/Loading/Loading";
import MyButton from "@/UI/Buttons/MyButton/MyButton";
import Rating from "@/components/Rating/Rating";
import TeacherCard from "@/components/UserCard/UserCard";
import AnimateSelect from "@/UI/AnimateSelect/AnimateSelect";
import Review from "@/components/Review/Review";

export default function () {
  const [token, setToken] = useState("");
  const { query }: { query: any } = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const courseId = query.id;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, []);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token") as string);
    if (query.id) {
      dispatch(gettingPartitions({ token, courseId }));
    }
  }, []);

  const { data: course = [], isLoading } = useGettingACourseQuery({
    token,
    courseId,
  });

  const { sections } = useAppSelector((state) => state.section);
  console.log(sections);

  // ---------------------------------------------------------------------------------------------------------------------------------
  // CREATOR
  const authorId = course.authorId;

  const { data: creator = {} } = useGetCreatorQuery({ token, authorId });

  // ---------------------------------------------------------------------------------------------------------------------------------
  // PUT
  const [changeBtn, setChangeBtn] = useState("Добавить в корзину");
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: any) => {
    api.info({
      message: `Успешно добавлено в корзину!`,
      placement,
    });
  };

  const [addingToCart, { isLoading: isLoadingAddingToCart }] =
    useAddingToCartMutation();

  const handleClick = () => {
    addingToCart({ token, courseId });
    openNotification(5);
    setChangeBtn("Добавлено");
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={s.course}>
          {contextHolder}

          <div className={s.course__content}>
            <aside>
              <div
                className={s.course__poster}
                onClick={() => setIsModalOpen(!isModalOpen)}
              >
                <FontAwesomeIcon
                  className={s.course__play}
                  icon={faCirclePlay}
                />
                <span>Просмотреть этот курс</span>
                <Image
                  src={course.imageUrl}
                  alt={course.imageName}
                  width={200}
                  height={200}
                />

                <div className={s.blackout}></div>
              </div>

              <div className={s.aside__body}>
                <span className={s.aside_price}>{course.price} $</span>
                <MyButton
                  className={s.aside__button}
                  onClick={handleClick}
                  loading={isLoadingAddingToCart}
                >
                  {changeBtn}
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
                <b>Материалы курса:</b>
                {Array.isArray(sections) &&
                  sections.map((section) => (
                    <AnimateSelect section={section} key={section.id} />
                  ))}
              </div>
              <b className={s.course__creator}>Преподаватель:</b>
              <TeacherCard user={creator} />
            </div>
          </div>
          <Review />
        </div>
      )}
    </>
  );
}
