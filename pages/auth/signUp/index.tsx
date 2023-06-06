import React, { FC, useEffect, useState } from "react";
import s from "./signUp.module.scss";

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
import MyButton from "../../../UI/Buttons/MyButton/MyButton";

interface IUserRegister {
  fullName: string;
  email: string;
  password: string;
  passwordSecond: string;
}

const SignUp: FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { push, locale } = useRouter();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    if (parsedToken) {
      push("/setting");
    }
  }, [isLoading]);

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
    const { password, passwordSecond } = value;
    if (password !== passwordSecond) {
      setErrorMessage(t.signUp[11]);
    } else {
      dispatch(userRegistration(value));
    }
  };

  return (
    <section className={s.signUp}>
      <ParticlesComponent />
      <h2>{t.signUp[0]}</h2>
      <Form form={form} name="sign-up-form" onFinish={handleSubmit}>
        <Form.Item
          className={s.signUp__deIndenting}
          name="fullName"
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
          className={s.signUp__deIndenting}
          name="email"
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
          className={s.signUp__deIndenting}
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

        <span className={s.error}>{errorMessage}</span>

        <Form.Item
          className={s.signUp__deIndenting}
          name="passwordSecond"
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

        <Form.Item>
          <MyButton
            className={s.signUp__deIndenting}
            background="#7329c2"
            hoverBackground="#03d665"
            type="primary"
            loading={isLoading}
          >
            {t.signUp[12]}
          </MyButton>
        </Form.Item>

        <Form.Item>
          <Link href="https://spring-boot-online-platform.herokuapp.com/oauth2/authorization/google">
            {t.signUp[13]}
          </Link>
        </Form.Item>

        <Form.Item>
          <Link href="https://spring-boot-online-platform.herokuapp.com/oauth2/authorization/github">
            {t.signUp[14]}
          </Link>
        </Form.Item>
      </Form>
    </section>
  );
};

export default SignUp;