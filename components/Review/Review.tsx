import React, { FC, useEffect, useState } from "react";
import s from "./Review.module.scss";

import { useRouter } from "next/router";
import Image from "next/image";
import { Form, Input, InputNumber } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import {
  useAddReviewMutation,
  useGetReviwsQuery,
} from "@/redux/reducers/review";
import { IReview } from "@/redux/types/review";

import Rating from "../Rating/Rating";
import MyButton from "../../UI/Buttons/MyButton/MyButton";

const Review: FC<{grade: number}> = ({grade}) => {
  const [token, setToken] = useState("");
  const { query }: { query: any } = useRouter();
  const courseId = query.id;
  
  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, []);  

  // ---------------------------------------------------------------------------------------------------------------------------------
  // GET
  const { data = [] } = useGetReviwsQuery({ token, courseId });

  // ---------------------------------------------------------------------------------------------------------------------------------
  // POST
  const [addReview, {isLoading}] = useAddReviewMutation();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ ...form.getFieldsValue() });
  }, []);
  const handleSubmit = async (values: any) => {
    await addReview({ courseId, token, values }).unwrap();
  };
  
  return (
    <article className={s.reviewCards}>
    <div className={s.reviewCards__leaveFeedback}>
    <b>Оставьте отзыв</b>
      <Form layout="vertical" form={form} name="form" onFinish={handleSubmit}>
        <Form.Item
          label="Заголовок"
          name="title"
          rules={[{ required: true, message: "Please input your review!" }]}
        >
          <Input placeholder="Введите заголовок" />
        </Form.Item>

        <Form.Item
          label="Описание"
          name="description"
          rules={[{ required: true, message: "Please input your review!" }]}
        >
          <Input placeholder="Введите описание" />
        </Form.Item>

        <Form.Item
          label="Оценка"
          name="grade"
          rules={[{ required: true, message: "Please input your review!" }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item>
          <MyButton
            background="#7329c2"
            hoverBackground="#03d665"
            type="primary"
            loading={isLoading}
          >
            Submit
          </MyButton>
        </Form.Item>
      </Form>
    </div>

      <b className={s.reviewCards__grade}>
        <FontAwesomeIcon className={s.reviewCard__icon} icon={faStar} /> Оценок
        курса: {grade} 2K оценки
      </b>

      <div className={s.reviewCard__wrap}>
        {data.map((rewiew: IReview) => {
          return (
            <div className={s.reviewCard} key={rewiew.id}>
              <header className={s.reviewCard__avatar}>
                <Image
                  src={rewiew.userImageUrl}
                  alt="avatar"
                  width={300}
                  height={200}
                />

                <ul className={s.reviewCard__list}>
                  <li className={s.reviewCard__fullName}>{rewiew.userFullname}</li>
                  <li className={s.reviewCard__email}>{rewiew.userEmail}</li>
                  <li className={s.reviewCard__rating}>
                    <pre>{rewiew.grade}</pre>
                    <Rating value={rewiew.grade} />
                  </li>
                </ul>
              </header>
              <b>{rewiew.title}</b>
              <p>{rewiew.description}</p>
              <footer>
                <span>
                  <pre>Это было полезно?</pre>
                  <span>
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#03d655" }}
                    />
                    <FontAwesomeIcon
                      icon={faThumbsDown}
                      bounce
                      style={{ color: "#ff4d4f" }}
                    />
                  </span>
                </span>
              </footer>
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default Review;
