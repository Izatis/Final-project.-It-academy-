import React, { FC, useEffect, useState } from "react";
import s from "./editing.module.scss";

import Link from "next/link";
import { useRouter } from "next/router";
import {
  Form,
  Input,
  InputNumber,
  Upload,
  UploadFile,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import en from "../../locales/EN/translation.json";
import ru from "../../locales/RU/translation.json";

import MyButton from "../../UI/Buttons/MyButton/MyButton";
import { editingUser } from "../../redux/reducers/user.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { IEditingUser } from "@/redux/types/user";
import { RcFile } from "antd/es/upload";

const Editing: FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector((state) => state.user);

  // Для - маршутизации
  const { locale } = useRouter();

  // Функции - для смены текста
  const t = locale === "ru" ? ru : en;
  
  // Отправляем post запрос для редактирования
  const onSubmit = (value: IEditingUser) => {
    const { password, passwordSecond } = value;
    if (password !== passwordSecond) {
      setErrorMessage(t.editing[15]);
    } else {
      // Достаем токен пользователя
      const parsedToken = JSON.parse(localStorage.getItem("token") as string);

      const id = user.id;
      dispatch(editingUser({ value, id, parsedToken }));
    }
  };

 
  // Для сохранения значений инпутов
  const [form] = Form.useForm();

  const [uploadChange, setUploadChange] = useState(null);

  useEffect(() => {
    if (uploadChange !== null) {
      form.setFieldsValue({ ...form.getFieldsValue(), imageUrl: uploadChange });
    }
  }, [uploadChange])
  

  return (
    <div className={s.editing}>
      <h2>{t.editing[0]}</h2>
      <Form
        layout="vertical"
        form={form}
        name="payment-form"
        onFinish={onSubmit}
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

        <Form.Item
          name="dateOfBirth"
          label={t.editing[18]}
          rules={[
            {
              required: true,
              message: t.editing[13],
            },
          ]}
        >
          <InputNumber min={1000} max={2023} />
        </Form.Item>

        <Form.Item name='imageUrl' label={t.editing[13]}>
          <Upload
            listType="picture-circle"
            accept="picture/*"
            maxCount={1}
            onPreview={onPreview}
            onChange={(value: any) => setUploadChange(value.file.uid)}
          >
            {fileList.length < 2 && "+ Upload"}
          </Upload>
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
            <Link href="/setting/setting">
              <MyButton
                className={s.editing__button}
                background="#7329c2"
                hoverBackground="#03d665"
                type="primary"
              >
                {t.editing[22]}
              </MyButton>
            </Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Editing;
