import React, { FC, useEffect, useState } from "react";
import s from "./passwordRecovery.module.scss";

import { useRouter } from "next/router";
import cn from "classnames";
import { Form, Input } from "antd";
import en from "../../../locales/EN/translation.json";
import ru from "../../../locales/RU/translation.json";
import de from "../../../locales/DE/translation.json";
import ch from "../../../locales/CH/translation.json";
import fr from "../../../locales/FR/translation.json";
import uk from "../../../locales/UK/translation.json";
import { MailOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { usePasswordRecoveryMutation } from "@/redux/reducers/password";

import MyButton from "../../../UI/Buttons/MyButton/MyButton";

const PasswordRecovery: FC = () => {
  const { locale } = useRouter();
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
  const [passwordRecovery, { isLoading, data, error }] =
    usePasswordRecoveryMutation();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ ...form.getFieldsValue() });
  }, []);
  const onFinish = async (value: any) => {
    const email = value.email;
    await passwordRecovery({ email });
  };

  useEffect(() => {
    if (data) setSuccessMessage(data.message);
    if (error) {
      setErrorMessage(error.message);
    }
  }, [data, error]);

  return (
    <section className={s.passwordRecovery}>
      <h2>{t.passwordRecovery[0]}</h2>
      <Form form={form} name="password-recovery-form" onFinish={onFinish}>
        <Form.Item
        className={s.deIndenting}
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
          <Input
            className={s.passwordRecovery__input}
            placeholder={t.passwordRecovery[1]}
            prefix={<MailOutlined />}
          />
        </Form.Item>

        <span className={cn(!!successMessage ? s.successfully : s.error)}>
          {errorMessage || successMessage}
        </span>

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

export default PasswordRecovery;
