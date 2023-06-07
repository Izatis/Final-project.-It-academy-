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
import { useNewPasswordRequestMutation } from "@/redux/reducers/password";

import MyButton from "../../../UI/Buttons/MyButton/MyButton";

interface INewPassword {
  newPassword: any;
  passwordСonfirmation: string;
}

const NewPassword: FC = () => {
  const [recoveryToken, setRecoveryToken] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [passwordMismatchMessage, setPasswordMismatchMessage] = useState("");
  const { push, locale } = useRouter();

  useEffect(() => {
    const fullUrl = window.location.href;
    const token = fullUrl.split(
      "http://localhost:3000/password/newPassword?token="
    )[1];
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
      setRecoveryToken(token);
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
  const [newPasswordRequest, { isLoading }] = useNewPasswordRequestMutation();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ ...form.getFieldsValue() });
  }, []);
  const onFinish = async (value: INewPassword) => {
    setIsButtonClicked(true);
    const { newPassword, passwordСonfirmation } = value;
    if (newPassword !== passwordСonfirmation) {
      setPasswordMismatchMessage("Пароли не совпадают!");
    } else {
      push("/auth/signIn");
      await newPasswordRequest({ recoveryToken, newPassword }).unwrap();
    }
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
              min: isButtonClicked ? 6 : undefined,
              message: t.signUp[9],
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder={t.signUp[3]} />
        </Form.Item>

        <span className={s.error}>{passwordMismatchMessage}</span>

        <Form.Item
          className={s.signUp__margin}
          name="passwordСonfirmation"
          rules={[
            {
              required: true,
              message: t.signUp[10],
            },
            {
              message: passwordMismatchMessage,
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
