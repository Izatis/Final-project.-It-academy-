import React, { FC, useEffect, useState } from "react";
import s from "./passwordRecovery.module.scss";

import { useRouter } from "next/router";
import axios from "axios";
import { Form } from "antd";
import { MailOutlined, ArrowRightOutlined } from "@ant-design/icons";

import en from "../../locales/EN/translation.json";
import ru from "../../locales/RU/translation.json";
import MyInput from "@/components/MUI/MyInput/MyInput";
import MyButton from "../../components/MUI/Buttons/MyButton/MyButton";

interface IPasswordRecovery {
  email: string;
}

const PasswordRecovery: FC = () => {
  // Состояния - для данных пользователя регистрации
  const [passwordRecovery, setPasswordRecovery] = useState<IPasswordRecovery>({
    email: "arsendsfsdov@gmail.com",
  });
  // Состояния - для загрузки кнопки
  const [loading, setLoading] = useState<boolean>(false);

  // Для - маршутизации
  const { locale } = useRouter();

  // Функции - для смены текста
  const t = locale === "ru" ? ru : en;

  // Отправляем post запрос для восстановления пароля
  const handleSubmit = async (value: IPasswordRecovery): Promise<void> => {
    setLoading(true);
    const BASE_URL = "https://spring-boot-online-platform.herokuapp.com";

    try {
      const {data} = await axios.post(
        BASE_URL + `/password/reset?email=${value.email}`
      );

      // Сбрасываем поля объекта
      setPasswordRecovery({
        email: "",
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };


  // Для сохранения значения инпутa
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...passwordRecovery });
  }, []);

  return (
    <section className={s.passwordRecovery}>
      <h2>{t.passwordRecovery[0]}</h2>
      <Form form={form} name="password-recovery-form" onFinish={handleSubmit}>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: t.passwordRecovery[2],
            },
            {
              required: true,
              message: t.passwordRecovery[3],
            },
          ]}
        >
          <MyInput
            className={s.passwordRecovery__input}
            size="large"
            placeholder={t.passwordRecovery[1]}
            prefix={<MailOutlined />}
          />
        </Form.Item>

        <Form.Item>
          <MyButton
            className={s.passwordRecovery__button}
            type="primary"
            loading={loading}
          >
            {t.passwordRecovery[4]}
            <ArrowRightOutlined />
          </MyButton>
        </Form.Item>
      </Form>
    </section>
  );
};

export default PasswordRecovery;
