import React, { FC, useEffect, useState } from "react";
import s from "./registration.module.scss";

import Link from "next/link";
import { useRouter } from "next/router";
import { Form, Input } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import en from "../../../locales/EN/translation.json";
import ru from "../../../locales/RU/translation.json";
import de from "../../../locales/DE/translation.json";
import ch from "../../../locales/CH/translation.json";
import fr from "../../../locales/FR/translation.json";
import uk from "../../../locales/UK/translation.json";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { userRegistration } from "@/redux/reducers/auth.slice";

import ParticlesComponent from "@/components/Particles/Particles";
import MyButton from "../../../components/UI/Buttons/MyButton/MyButton";

interface IUserRegister {
  fullName: string;
  email: string;
  password: string;
  passwordСonfirmation: string;
}

const Registration: FC = () => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [passwordMismatchMessage, setPasswordMismatchMessage] = useState("");
  const { push, locale } = useRouter();
  const {isToken, isLoading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    if (parsedToken) {
      push("/setting/userSettings");
    }
  }, [isToken]);

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
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ ...form.getFieldsValue() });
  }, []);

  const handleSubmit = (value: IUserRegister) => {
    setIsButtonClicked(true);
    const { password, passwordСonfirmation } = value;
    if (password !== passwordСonfirmation) {
      setPasswordMismatchMessage(t.registration[11]);
    } else {
      dispatch(userRegistration(value));
    }
  };

  return (
    <section className={s.registration}>
      <ParticlesComponent />
      <h2>{t.registration[0]}</h2>
      <Form form={form} name="sign-up-form" onFinish={handleSubmit}>
        <Form.Item
          className={s.registration__deIndenting}
          name="fullName"
          rules={[
            {
              required: true,
              message: t.registration[5],
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder={t.registration[1]} />
        </Form.Item>

        <Form.Item
          className={s.registration__deIndenting}
          name="email"
          rules={[
            {
              required: true,
              message: t.registration[6],
            },
            {
              type: isButtonClicked ? "email" : undefined,
              message: t.registration[7],
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder={t.registration[2]} />
        </Form.Item>

        <span className={s.error}>{error}</span>

        <Form.Item
          className={s.registration__deIndenting}
          name="password"
          rules={[
            {
              required: true,
              message: t.registration[8],
            },
            {
              min: isButtonClicked ? 6 : undefined,
              message: t.registration[9],
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder={t.registration[3]} />
        </Form.Item>

        <span className={s.error}>{passwordMismatchMessage}</span>

        <Form.Item
          className={s.registration__deIndenting}
          name="passwordСonfirmation"
          rules={[
            {
              required: true,
              message: t.registration[10],
            },
            {
              message: passwordMismatchMessage,
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder={t.registration[4]} />
        </Form.Item>

        <Form.Item>
          <MyButton
            className={s.registration__deIndenting}
            background="#7329c2"
            hoverBackground="#03d665"
            type="primary"
            loading={isLoading}
          >
            {t.registration[12]}
          </MyButton>
        </Form.Item>

        <Form.Item>
          <Link href="https://spring-boot-online-platform.herokuapp.com/oauth2/authorization/google">
            {t.registration[13]}
          </Link>
        </Form.Item>

        <Form.Item>
          <Link href="https://spring-boot-online-platform.herokuapp.com/oauth2/authorization/github">
            {t.registration[14]}
          </Link>
        </Form.Item>
      </Form>
    </section>
  );
};

export default Registration;
