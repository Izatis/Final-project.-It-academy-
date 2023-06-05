import React, { FC, useEffect, useState } from "react";
import s from "./signIn.module.scss";

import Link from "next/link";
import { useRouter } from "next/router";
import { Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import en from "../../../locales/EN/translation.json";
import ru from "../../../locales/RU/translation.json";
import de from "../../../locales/DE/translation.json";
import ch from "../../../locales/CH/translation.json";
import fr from "../../../locales/FR/translation.json";
import uk from "../../../locales/UK/translation.json";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { userAuthorization } from "@/redux/reducers/auth.slice";

import ParticlesComponent from "@/components/Particles/Particles";
import MyButton from "@/UI/Buttons/MyButton/MyButton";

interface IUserLogin {
  username: string;
  password: string;
}

const SignIn: FC = () => {
  // Состояния - для данных пользователя авторизации
  const [userLogin, setUserLogin] = useState<IUserLogin>({
    username: "arsenov@gmail.com",
    password: "12345678",
  });

  const dispatch = useAppDispatch();
  const { token, isLoading, error } = useAppSelector((state) => state.auth);

  // Для - маршутизации
  const { push, locale } = useRouter();

  // Функции - для смены текста
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
  useEffect(() => {
    // Достаем токен пользователя
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    if (!!parsedToken) {
      push("/setting/setting");
    }
  }, [token]);

  // Отправляем post запрос для регистрации
  const handleSubmit = (value: IUserLogin) => {
    dispatch(userAuthorization(value));

    setUserLogin({
      username: "",
      password: "",
    });
  };

  // Для сохранения значений инпутов
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...userLogin });
  }, []);

  return (
    <section className={s.signIn}>
      <ParticlesComponent />
      <h2>{t.signIn[0]}</h2>
      <Form form={form} name="sign-in-form" onFinish={handleSubmit}>
        <Form.Item
          className={s.signIn__margin}
          name="username"
          rules={[
            {
              type: "email",
              message: t.signIn[3],
            },
            {
              required: true,
              message: t.signIn[4],
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder={t.signIn[1]} />
        </Form.Item>
        <span className={s.error}>{error}</span>

        <Form.Item
          className={s.signIn__margin}
          name="password"
          rules={[
            {
              required: true,
              message: t.signIn[5],
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder={t.signIn[2]} />
        </Form.Item>

        <Form.Item>
          <MyButton
            className={s.signIn__margin}
            background="#03d665"
            hoverBackground="#7329c2"
            type="primary"
            loading={isLoading}
          >
            {t.signIn[6]}
          </MyButton>
        </Form.Item>

        <Form.Item>
          <Link
            className={s.signIn__link}
            href="https://spring-boot-online-platform.herokuapp.com/oauth2/authorization/google"
          >
            {t.signIn[7]}
          </Link>
        </Form.Item>

        <Form.Item>
          <Link
            className={s.signIn__link}
            href="https://spring-boot-online-platform.herokuapp.com/oauth2/authorization/github"
          >
            {t.signIn[8]}
          </Link>
        </Form.Item>

        <Form.Item>
          <Link
            className={s.signIn__link}
            href="/password/passwordRecovery/passwordRecovery"
          >
            {t.signIn[9]}
          </Link>
        </Form.Item>
      </Form>
    </section>
  );
};

export default SignIn;
