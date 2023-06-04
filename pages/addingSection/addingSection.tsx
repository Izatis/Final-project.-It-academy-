import React, { FC, useEffect, useState } from "react";
import s from "./addingSection.module.scss";

import { useRouter } from "next/router";
import { Form, Input } from "antd";
import en from "../../locales/EN/translation.json";
import ru from "../../locales/RU/translation.json";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { createPartition } from "@/redux/reducers/section.slice";
import { ICreatePartition } from "@/redux/types/section";

import MyButton from "@/UI/Buttons/MyButton/MyButton";

const AddingSection: FC = () => {
  // Состояния - для данных
  const [file, setFile] = useState<ICreatePartition>({
    name: "",
  });

  // Для - маршутизации
  const { locale } = useRouter();

  // Функции - для смены текста
  const t = locale === "ru" ? ru : en;

  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const { courseIdBackend, error } = useAppSelector((state) => state.course);
  // Отправляем post запрос
  const handleSubmit = async (value: ICreatePartition) => {
    // Достаем токен пользователя
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);

    const courseId = courseIdBackend;

    dispatch(createPartition({ courseId, value, parsedToken }));
    push("/addingLesson/addingLesson");

    // Сбрасываем поля объекта
    setFile({
      name: "",
    });
  };

  // Для сохранения значений инпутов
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...file });
  }, []);

  return (
    <section className={s.signIn}>
      <h2>Добавление раздела</h2>
      <Form
        layout="vertical"
        form={form}
        name="add-course-form"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="name"
          label={"Название раздела"}
          rules={[
            {
              required: true,
              message: t.addingCourse[6],
            },
          ]}
        >
          <Input.TextArea placeholder={"Введите название раздела"} />
        </Form.Item>

        <span className={s.error}>{error}</span>

        <Form.Item>
          <MyButton
            background="#03d665"
            hoverBackground="#7329c2"
            type="primary"
            // loading={isLoading}
          >
            {t.addingCourse[8]}
          </MyButton>
        </Form.Item>
      </Form>
    </section>
  );
};

export default AddingSection;
