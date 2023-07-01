import React, { FC, useEffect, useState } from "react";
import s from "./authorization.module.scss";

import Link from "next/link";
import { useRouter } from "next/router";
import { Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import en from "../../../locales/EN/translation.json";
import ru from "../../../locales/RU/translation.json";
import de from "../../../locales/DE/translation.json";
import ch from "../../../locales/CH/translation.json";
import fr from "../../../locales/FR/translation.json";
import uk from "../../../locales/UK/translation.json";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { userAuthorization } from "@/redux/reducers/auth.slice";

import ParticlesComponent from "@/components/Particles/Particles";
import MyButton from "@/components/UI/Buttons/MyButton/MyButton";

interface IUserLogin {
  username: string;
  password: string;
}

const Authorization: FC = () => {
  const [token, setToken] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const { push, locale } = useRouter();
  const dispatch = useAppDispatch();
  const { isToken, isLoading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);

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

  const handleSubmit = (value: IUserLogin) => {
    setIsButtonClicked(true);
    dispatch(userAuthorization(value));
  };

  return (
    <section className={s.authorization}>
      <ParticlesComponent />
      <h2>{t.authorization[0]}</h2>
      <Form form={form} name="sign-in-form" onFinish={handleSubmit}>
        <Form.Item
          className={s.authorization__deIndenting}
          name="username"
          rules={[
            {
              required: true,
              message: t.authorization[3],
            },
            {
              type: isButtonClicked ? "email" : undefined,
              message: t.authorization[4],
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder={t.authorization[1]} />
        </Form.Item>
        <span className={s.error}>{error}</span>

        <Form.Item
          className={s.authorization__deIndenting}
          name="password"
          rules={[
            {
              required: true,
              message: t.authorization[5],
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder={t.authorization[2]} />
        </Form.Item>

        <Form.Item>
          <MyButton
            className={s.authorization__deIndenting}
            background="#03d665"
            hoverBackground="#7329c2"
            type="primary"
            loading={isLoading}
          >
            {t.authorization[6]}
          </MyButton>
        </Form.Item>

        <Form.Item>
          <Link
            className={s.authorization__link}
            href="https://spring-boot-online-platform.herokuapp.com/oauth2/authorization/google"
          >
            {t.authorization[7]}
          </Link>
        </Form.Item>

        <Form.Item>
          <Link
            className={s.authorization__link}
            href="https://spring-boot-online-platform.herokuapp.com/oauth2/authorization/github"
          >
            {t.authorization[8]}
          </Link>
        </Form.Item>

        <Form.Item>
          <Link className={s.authorization__link} href="/password/passwordRecovery">
            {t.authorization[9]}
          </Link>
        </Form.Item>
      </Form>
    </section>
  );
};

export default Authorization;
