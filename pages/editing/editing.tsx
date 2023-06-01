import React, { FC, useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
import s from "./editing.module.scss";

import { useRouter } from "next/router";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import en from "../../locales/EN/translation.json";
import ru from "../../locales/RU/translation.json";
import MyButton from "../../components/UI/Buttons/MyButton/MyButton";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

const { Option } = Select;

const Editing: FC = () => {
  // Данные пользователя
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dispatch = useAppDispatch();
  const { token, isLoading, error } = useAppSelector((state) => state.auth);
  // Для - маршутизации
  const { locale } = useRouter();

  // Функции - для смены текста
  const t = locale === "ru" ? ru : en;

  // Состояния - для загрузки кнопки
  const [loading, setLoading] = useState<boolean>(false);

  // Функция - для загрузки кнопки
  const onFinish = () => {
    setLoading(!loading);
  };

  // Отправляем post запрос для редактирования

  // Для сохранения значений инпутов
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...userData });
  }, []);

  return (
    <div className={s.editing}>
      <h2>Редактирования</h2>
      <Form
        form={form}
        layout="vertical"
        name="payment-form"
        onFinish={onFinish}
      >
        <Form.Item
          name="fullName"
          label={t.signUp[1]}
          rules={[
            {
              required: true,
              message: t.signUp[5],
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder={t.signUp[1]} />
        </Form.Item>

        <Form.Item
          name="email"
          label={t.signUp[2]}
          rules={[
            {
              type: "email",
              message: t.signUp[6],
            },
            {
              required: true,
              message: t.signUp[7],
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder={t.signUp[2]} />
        </Form.Item>

        <span className={s.error}>{error}</span>

        <Form.Item
          name="password"
          label={t.signUp[3]}
          rules={[
            {
              required: true,
              message: t.signUp[8],
            },
            {
              min: 6,
              message: t.signUp[9],
            },
          ]}
          className={s.test}
        >
          <Input.Password prefix={<LockOutlined />} placeholder={t.signUp[3]} />
        </Form.Item>

        <span className={s.error}>{errorMessage}</span>

        <Form.Item
          name="passwordSecond"
          label={t.signUp[4]}
          rules={[
            {
              required: true,
              message: t.signUp[10],
            },

            {
              message: errorMessage,
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder={t.signUp[4]} />
        </Form.Item>
        <Form.Item name="avatar" label="Avatar">
          <Input placeholder="Enter your avatar URL" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input placeholder="Enter your description" />
        </Form.Item>
        <Form.Item>
          <div className={s.editing__buttonGroup}>
            <MyButton
              className={s.editing__button}
              background="#7329c2"
              hoverBackground="#03d665"
              type="primary"
              loading={loading}
            >
              Save
            </MyButton>
            <MyButton
              className={s.editing__button}
              background="#7329c2"
              hoverBackground="#03d665"
              type="primary"
              loading={loading}
            >
              Cancel
            </MyButton>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Editing;
