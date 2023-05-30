import React, { FC, useEffect, useState } from "react";
import s from "./addingCourse.module.scss";

import { useRouter } from "next/router";
import axios, { AxiosResponse } from "axios";
import { Button, Form, Input, Upload, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import en from "../../locales/EN/translation.json";
import ru from "../../locales/RU/translation.json";
import MyButton from "@/components/MUI/Buttons/MyButton/MyButton";
import MySelect from "@/components/MUI/MySelect/MySelect";

interface IFile {
  title: string;
  description: string;
  languge: string;
  video: any;
}

const AddingCourse: FC = () => {
  // Состояния - для данных
  const [file, setFile] = useState<IFile>({
    title: "",
    description: "",
    languge: "",
    video: "",
  });
  // Состояния - для ошибок
  const [errorMessage, setErrorMessage] = useState(false);

  // Состояния - для загрузки кнопки
  const [loading, setLoading] = useState<boolean>(false);

  // Для - маршутизации
  const { push, locale } = useRouter();

  // Функции - для смены текста
  const t = locale === "ru" ? ru : en;

  // Отправляем post запрос
  const handleSubmit = async (value: IFile) => {
    setLoading(true);
    const BASE_URL = "https://spring-boot-online-platform.herokuapp.com";

    try {
      const { data }: AxiosResponse<{ token: string }> = await axios.post(
        BASE_URL + "/auth/login",
        value
      );

      // Сохраняем токен пользователя
      localStorage.setItem("token", JSON.stringify(data.token));

      // Достаем токен пользователя
      const token = localStorage.getItem("token") ?? "";
      const parsedToken = token !== "" ? (JSON.parse(token) as string) : "";

      // Если есть токен то перенаправляем пользователя на профиль
      if (!!parsedToken) {
        push("/userProfile/userProfile");
      }
      // Сбрасываем поля объекта
      setFile({
        title: "",
        description: "",
        languge: "",
        video: "",
      });
    } catch ({ response }: any) {
      setErrorMessage(response.data.message);
    }
    setLoading(false);
  };

  // Для сохранения значений инпутов
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...file });
  }, []);

  const fileList: UploadFile[] = [];

  return (
    <section className={s.signIn}>
      <h2>{t.addingCourse[0]}</h2>
      <Form form={form} name="add-course-form" onFinish={handleSubmit}>
        <Form.Item
          name="title"
          label={t.addingCourse[1]}
          rules={[
            {
              required: true,
              message: t.addingCourse[6],
            },
          ]}
        >
          <Input.TextArea placeholder={t.addingCourse[1]} />
        </Form.Item>

        <Form.Item
          name="description"
          label={t.addingCourse[2]}
          rules={[
            {
              required: true,
              message: t.addingCourse[6],
            },
          ]}
        >
          <Input.TextArea placeholder={t.addingCourse[2]} />
        </Form.Item>

        <Form.Item
          label={t.addingCourse[3]}
          name="video"
          rules={[
            {
              required: true,
              message: t.addingCourse[5],
            },
          ]}
        >
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture"
            defaultFileList={[...fileList]}
          >
            <Button icon={<UploadOutlined />}>{t.addingCourse[4]}</Button>
          </Upload>
          <br />
          <br />
        </Form.Item>

        <Form.Item name="languge" label={t.addingCourse[5]}>
          <MySelect
            defaultValue={t.addingCourse[4]}
            options={[
              { value: "Русский", label: "Русский" },
              { value: "English", label: "English" },
            ]}
          />
        </Form.Item>

        <span className={s.error}>{errorMessage}</span>

        <Form.Item>
          <MyButton
            background="#03d665"
            hoverBackground="#7329c2"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            {t.addingCourse[7]}
          </MyButton>
        </Form.Item>
      </Form>
    </section>
  );
};

export default AddingCourse;
