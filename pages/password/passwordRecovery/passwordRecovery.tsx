import React, { FC, useEffect, useState } from "react";
import s from "./passwordRecovery.module.scss";

import { useRouter } from "next/router";
import { Form, Input } from "antd";
import { MailOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { usePasswordRecoveryMutation } from "@/redux/reducers/password";
import en from "../../../locales/EN/translation.json";
import ru from "../../../locales/RU/translation.json";

import MyButton from "../../../UI/Buttons/MyButton/MyButton";

const PasswordRecovery: FC = () => {
  const { locale } = useRouter();
  const t = locale === "ru" ? ru : en;

  // ---------------------------------------------------------------------------------------------------------------------------------
  // POST
  const [passwordRecovery, { isLoading, isError }] =
    usePasswordRecoveryMutation();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ ...form.getFieldsValue() });
  }, []);
  const onFinish = async (value: any) => {
    console.log(value.email);
    const email = value.email;
    await passwordRecovery({ email }).unwrap();
  };

  return (
    <section className={s.passwordRecovery}>
      <h2>{t.passwordRecovery[0]}</h2>
      <Form form={form} name="password-recovery-form" onFinish={onFinish}>
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
          <Input
            className={s.passwordRecovery__input}
            placeholder={t.passwordRecovery[1]}
            prefix={<MailOutlined />}
          />
        </Form.Item>

        <span className={s.error}>{isError}</span>

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
