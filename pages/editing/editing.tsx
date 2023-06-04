import React, { FC, useEffect, useState } from "react";
import s from "./editing.module.scss";

import { useRouter } from "next/router";
import Link from "next/link";
import { Form, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import en from "../../locales/EN/translation.json";
import ru from "../../locales/RU/translation.json";
import { useEditingUserMutation } from "@/redux/reducers/user";

import MyButton from "../../UI/Buttons/MyButton/MyButton";
import axios from "axios";

const Editing: FC = () => {
  const [token, setToken] = useState("");
  const { locale } = useRouter();
  const t = locale === "ru" ? ru : en;

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, []);

  // ---------------------------------------------------------------------------------------------------------------------------------
  // POST
  const [editingUser] = useEditingUserMutation();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ ...form.getFieldsValue() });
  }, []);
  const handleSubmit = async (values: any) => {
    const { data } = await axios.put(
      `https://spring-boot-online-platform.herokuapp.com/user`,
      values,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // await editingUser({ token, userId, values }).unwrap();
  };

  return (
    <div className={s.editing}>
      <h2>{t.editing[0]}</h2>
      <Form
        layout="vertical"
        form={form}
        name="payment-form"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="fullName"
          label={t.editing[1]}
          rules={[
            {
              required: true,
              message: t.editing[2],
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder={t.editing[3]} />
        </Form.Item>

        <Form.Item
          name="dateOfBirth"
          label={t.editing[18]}
          rules={[
            {
              required: true,
              message: t.editing[13],
            },
          ]}
        >
          <Input type="date" min={1000} max={2023} />
        </Form.Item>

        <Form.Item>
          <div className={s.editing__buttonGroup}>
            <MyButton
              className={s.editing__button}
              background="#7329c2"
              hoverBackground="#03d665"
              type="primary"
            >
              {t.editing[21]}
            </MyButton>
            <Link href="/setting/setting">
              <MyButton
                className={s.editing__button}
                background="#7329c2"
                hoverBackground="#03d665"
                type="primary"
              >
                {t.editing[22]}
              </MyButton>
            </Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Editing;
