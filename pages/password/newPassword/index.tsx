import React, { FC, useEffect, useState } from "react";
import s from "./NewPassword.module.scss";

import { useRouter } from "next/router";
import { Form, Input } from "antd";
import { LockOutlined, ArrowRightOutlined } from "@ant-design/icons";
import en from "../../../locales/EN/translation.json";
import ru from "../../../locales/RU/translation.json";
import de from "../../../locales/DE/translation.json";
import ch from "../../../locales/CH/translation.json";
import fr from "../../../locales/FR/translation.json";
import uk from "../../../locales/UK/translation.json";
import { useNewPasswordMutation } from "@/redux/reducers/password";

import MyButton from "../../../UI/Buttons/MyButton/MyButton";

interface INewPassword {
  newPassword: number;
  newPasswordСonfirmation: number;
}

const NewPassword: FC = () => {
  const [token, setToken] = useState("");
  const [passwordСonfirmation, setPasswordСonfirmation] = useState("");
  const { push, locale } = useRouter();

  useEffect(() => {
    const fullUrl = window.location.href;
    const token = fullUrl.split(
      "http://localhost:3000/password/newPassword/newPassword?token="
    )[1];
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
      setToken(token);
    }
  }, []);

  let t: any;
  switch (locale) {
    case "en":
      t = en;
      break;
    case "de":
      t = de;
      break;
    case "ch":
      t = ch;
      break;
    case "fr":
      t = fr;
      break;
    case "uk":
      t = uk;
      break;
    default:
      t = ru;
      break;
  }
  // ---------------------------------------------------------------------------------------------------------------------------------
  // POST
  const [newPassword, { isLoading }] = useNewPasswordMutation();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ ...form.getFieldsValue() });
  }, []);
  const onFinish = async (value: INewPassword) => {
    const { newPassword, newPasswordСonfirmation } = value;
    // if (newPassword !== passwordСonfirmation) {
    // setPasswordСonfirmation("Пароли не совпадают");
    // } else {
    push("/password/newPassword");
    await newPassword({ token, newPassword }).unwrap();
    // }
  };

  return (
    <section className={s.passwordRecovery}>
      <h2>Новый пароль</h2>
      <Form form={form} name="new-password-form" onFinish={onFinish}>
        <Form.Item
          className={s.signUp__margin}
          name="newPassword"
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
          name="newPasswordСonfirmation"
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
