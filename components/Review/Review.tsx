import React, { FC, useEffect, useState } from "react";
import s from "./Review.module.scss";

import { useRouter } from "next/router";
import Image from "next/image";
import { Button, Form, Input, InputNumber } from "antd";
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

const Review: FC = () => {
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
  const [addReview] = useAddReviewMutation();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ ...form.getFieldsValue() });
  }, []);
  const handleSubmit = async (values: any) => {
    if (values) {
      await addReview({ courseId, token, values }).unwrap();
    }
  };

  return (
    <article className={s.reviewCards}>
      <h2>
        <FontAwesomeIcon className={s.reviewCard__icon} icon={faStar} /> Оценок
        курса: 4,5 2K оценки
      </h2>

      <div className={s.reviewCard__wrap}>
        {data.map((rewiew: IReview) => {
          return (
            <div className={s.reviewCard} key={rewiew.id}>
              <header className={s.reviewCard__avatar}>
                <Image
                  src={rewiew.avatar}
                  alt="avatar"
                  width={300}
                  height={200}
                />

                <ul className={s.reviewCard__list}>
                  <li className={s.reviewCard__fullName}>{rewiew.title}</li>
                  <li className={s.reviewCard__rating}>
                    <pre>{rewiew.grade}</pre>
                    <Rating value={rewiew.grade} />
                  </li>
                </ul>
              </header>
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
          >
            Submit
          </MyButton>
        </Form.Item>
      </Form>
    </article>
  );
};

export default Review;
