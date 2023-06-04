import React, { FC, useEffect, useState } from "react";
import s from "./NewPassword.module.scss";

import { useRouter } from "next/router";
import { Form, Input } from "antd";
import { LockOutlined, ArrowRightOutlined } from "@ant-design/icons";
import en from "../../../locales/EN/translation.json";
import ru from "../../../locales/RU/translation.json";
import { useNewPasswordMutation } from "@/redux/reducers/password";

import MyButton from "../../../UI/Buttons/MyButton/MyButton";

interface INewPassword {
  password: number;
  passwordСonfirmation: number;
}

const NewPassword: FC = () => {
  const [token, setToken] = useState("");
  const [passwordСonfirmation, setPasswordСonfirmation] = useState("");
  const { push, locale } = useRouter();
  const t = locale === "ru" ? ru : en;
  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, []);

  // ---------------------------------------------------------------------------------------------------------------------------------
  // POST
  const [newPassword, { isLoading }] = useNewPasswordMutation();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ ...form.getFieldsValue() });
  }, []);
  const onFinish = async (value: INewPassword) => {
    const { password, passwordСonfirmation } = value;
    if (password !== passwordСonfirmation) {
      setPasswordСonfirmation("Пароли не совпадают");
    } else {
      push("/password/newPassword/newPassword");
      await newPassword({ token, value }).unwrap();
    }
  };

  return (
    <section className={s.passwordRecovery}>
      <h2>Новый пароль</h2>
      <Form form={form} name="new-password-form" onFinish={onFinish}>
        <Form.Item
          className={s.signUp__margin}
          name="password"
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
        >
          <Input.Password prefix={<LockOutlined />} placeholder={t.signUp[3]} />
        </Form.Item>

        <span className={s.error}>{passwordСonfirmation}</span>

        <Form.Item
          className={s.signUp__margin}
          name="passwordСonfirmation"
          rules={[
            {
              required: true,
              message: t.signUp[10],
            },

            {
              message: passwordСonfirmation,
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder={t.signUp[4]} />
        </Form.Item>

        <Form.Item>
          <MyButton
            className={s.passwordRecovery__button}
            type="primary"
            loading={isLoading}
          >
            {t.passwordRecovery[4]}
            <ArrowRightOutlined />
          </MyButton>
        </Form.Item>
      </Form>
    </section>
  );
};

export default NewPassword;
