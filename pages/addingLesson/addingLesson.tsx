import React, { FC, useEffect, useState } from "react";
import s from "./AddingLesson.module.scss";

import Link from "next/link";
import { UploadOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { Button, Form, Input, InputNumber, Upload } from "antd";
import en from "../../locales/EN/translation.json";
import ru from "../../locales/RU/translation.json";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import MyButton from "@/UI/Buttons/MyButton/MyButton";
import { addingALesson } from "@/redux/reducers/lesson.slice";
import { IAddingALesson } from "@/redux/types/lesson";

const AddingLesson: FC = () => {
  // Для - маршутизации
  const { push, locale } = useRouter();

  // Функции - для смены текста
  const t = locale === "ru" ? ru : en;

  const dispatch = useAppDispatch();
  const { sectionIdBackend, isLoading, error } = useAppSelector(
    (state) => state.section
  );
  const [uploadChange, setUploadChange] = useState("");


  // Отправляем post запрос
  const handleSubmit = async (value: IAddingALesson) => {
    // Достаем токен пользователя
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    const sectionId = sectionIdBackend;
    dispatch(addingALesson({ sectionId, value, parsedToken }));
    push("/addingVideo/addingVideo");
  };
  // Для сохранения значений инпутов
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...form.getFieldsValue() });
  }, []);
  return (
    <section className={s.signIn}>
      <h2>Добавление урока</h2>
      <Form
        layout="vertical"
        form={form}
        name="add-course-form"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="title"
          label={"Название урока"}
          rules={[
            {
              required: true,
              message: t.addingCourse[6],
            },
          ]}
        >
          <Input.TextArea placeholder={"Название урока"} />
        </Form.Item>
        <Form.Item
          name="description"
          label={t.addingCourse[2]}
          rules={[
            {
              required: true,
              message: t.addingCourse[6],
            },
          ]}
        >
          <Input.TextArea placeholder={t.addingCourse[2]} />
        </Form.Item>
        <Form.Item
          name="duration"
          label={"Длительность урока"}
          rules={[
            {
              required: true,
              message: t.addingCourse[6],
            },
          ]}
        >
          <InputNumber min={1} max={12} />
        </Form.Item>

        <span className={s.error}>{error}</span>
        <Form.Item>
          <MyButton
            background="#03d665"
            hoverBackground="#7329c2"
            type="primary"
            loading={isLoading}
          >
            {t.addingCourse[8]}
          </MyButton>
        </Form.Item>
      </Form>
    </section>
  );
};

export default AddingLesson;
