import { useEffect, useState } from "react";
import s from "./courseMore.module.scss";

import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import Rating from "@/components/Rating/Rating";
import AnimateSelect from "@/components/UI/AnimateSelect/AnimateSelect";
import MyButton from "@/components/UI/Buttons/MyButton/MyButton";
import TeacherCard from "@/components/TeacherCard/TeacherCard";
import ReviewCard from "@/components/ReviewCard/ReviewCard";
import Loading from "@/components/Loading/Loading";
import { gettingPartitions } from "@/redux/reducers/section.slice";
import { Button, Form, Input, InputNumber } from "antd";
import {
  useAddReviewMutation,
} from "@/redux/reducers/review";
import { useGettingACourseQuery } from "@/redux/reducers/course/course";

export default function () {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [token, setToken] = useState("");
  const { query }: { query: any } = useRouter();
  const courseId = query.id;

  const { data: course = [], isLoading } = useGettingACourseQuery({
    token,
    courseId,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Достаем токен пользователя
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);

    if (!!query.id) {
      const courseId = query.id;
      dispatch(gettingPartitions({ courseId, parsedToken }));
    }
  }, [query]);

  const { sections } = useAppSelector((state) => state.section);

  // Для сохранения значений инпутов
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...form.getFieldsValue() });
  }, []);

  // ---------------------------------------------------------------------------------------------------------------------------------
  // GET
  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, []);

  // POST
  const [addReview] = useAddReviewMutation();

  const onFinish = async (values: any) => {
    console.log(values);
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    const courseId = query.id;
    if (values) {
      await addReview({ courseId, parsedToken, values }).unwrap();
    }
  };

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

              {sections.map((section) => {
                return (
                  <AnimateSelect
                    section={section}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                  />
                );
              })}
            </div>

            <TeacherCard />

            <ReviewCard />

            <Form form={form} layout="vertical" name="form" onFinish={onFinish}>
              <Form.Item
                label="Оставить отзыв"
                name="title"
                rules={[
                  { required: true, message: "Please input your review!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Оставить отзыв"
                name="description"
                rules={[
                  { required: true, message: "Please input your review!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Оставить отзыв"
                name="grade"
                rules={[
                  { required: true, message: "Please input your review!" },
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}
