import React, { FC, useEffect, useState } from "react";
import s from "./editing.module.scss";

import { useRouter } from "next/router";
import { Button, Form, Input, Upload, UploadProps, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import en from "../../locales/EN/translation.json";
import ru from "../../locales/RU/translation.json";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { editingUser } from "@/redux/reducers/user.slice";

import MyButton from "../../components/UI/Buttons/MyButton/MyButton";
import { IEditingUser } from "@/redux/types/user";

const Editing: FC = () => {
  // Данные пользователя
  const [editingData, setEditingData] = useState<IEditingUser>({
    fullName: "arsenov",
    dateOfBirth: 0,
    email: "arsenov@gmail.com",
    password: "12345678",
    passwordSecond: "12345678",
    imageUrl: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector((state) => state.user);
  console.log(user);

  // Для - маршутизации
  const { locale } = useRouter();

  // Функции - для смены текста
  const t = locale === "ru" ? ru : en;

  const onFinish = (value: IEditingUser) => {
    const { password, passwordSecond } = value;
    if (password !== passwordSecond) {
      setErrorMessage(t.editing[15]);
    } else {
      // Достаем токен пользователя
      const parsedToken = JSON.parse(localStorage.getItem("token") as string);

      const id: number = user.id;
      dispatch(editingUser({ value, id, parsedToken }));

      setEditingData({
        fullName: "",
        dateOfBirth: 0,
        email: "",
        password: "",
        passwordSecond: "",
        imageUrl: "",
      });
    }
  };
  // Отправляем post запрос для редактирования

  // Для сохранения значений инпутов
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...editingData });
  }, []);

  const props: UploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className={s.editing}>
      <h2>{t.editing[0]}</h2>
      <Form
        form={form}
        layout="vertical"
        name="payment-form"
        onFinish={onFinish}
      >
        <Form.Item
          name="fullName"
          label={t.editing[1]}
          rules={[
            {
              required: true,
              message: t.editing[2],
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder={t.editing[3]} />
        </Form.Item>

        <Form.Item
          name="email"
          label={t.editing[4]}
          rules={[
            {
              required: true,
              message: t.editing[6],
            },
            {
              type: "email",
              message: t.editing[7],
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder={t.editing[5]} />
        </Form.Item>

        <span className={s.error}>{error}</span>

        <Form.Item
          name="password"
          label={t.editing[8]}
          rules={[
            {
              required: true,
              message: t.editing[10],
            },
            {
              min: 6,
              message: t.editing[11],
            },
          ]}
          className={s.test}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={t.editing[9]}
          />
        </Form.Item>

        <span className={s.error}>{errorMessage}</span>

        <Form.Item
          name="passwordSecond"
          label={t.editing[12]}
          rules={[
            {
              required: true,
              message: t.editing[14],
            },

            {
              message: errorMessage,
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={t.editing[13]}
          />
        </Form.Item>
        <Form.Item name="avatar" label={t.editing[16]}>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>{t.editing[17]}</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="dateOfBirth" label={t.editing[18]}>
          <Input placeholder={t.editing[19]} />
        </Form.Item>
        <Form.Item>
          <div className={s.editing__buttonGroup}>
            <MyButton
              className={s.editing__button}
              background="#7329c2"
              hoverBackground="#03d665"
              type="primary"
              loading={isLoading}
            >
              {t.editing[21]}
            </MyButton>
            <MyButton
              className={s.editing__button}
              background="#7329c2"
              hoverBackground="#03d665"
              type="primary"
            >
              {t.editing[22]}
            </MyButton>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Editing;
