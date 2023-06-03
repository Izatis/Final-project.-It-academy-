import React, { FC, useEffect, useState } from "react";
import s from "./AddingCourse.module.scss";

import Link from "next/link";
import { useRouter } from "next/router";
import { Form, Input, InputNumber, Select, UploadFile } from "antd";
import en from "../../locales/EN/translation.json";
import ru from "../../locales/RU/translation.json";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {  courseCreation } from "@/redux/reducers/course.slice";

import MyButton from "@/components/UI/Buttons/MyButton/MyButton";
import { ICourseCreation } from "@/redux/types/course";


const AddingCourse: FC = () => {
  // Состояния - для данных
  const [file, setFile] = useState<ICourseCreation>({
    name: "JavaScript",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet culpa corrupti, itaque exercitationem temporibus quos iste recusandae quis tempore consequuntur consequatur corporis beatae saepe facere illum perferendis quisquam. Reprehenderit, iusto!",
    price: "12",
    language: "Russian",
  });

  // Для - маршутизации
  const { locale } = useRouter();

  // Функции - для смены текста
  const t = locale === "ru" ? ru : en;

  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.course);
  // Обработчик изменения значения компонента Upload
  const handleUploadChange = (info: any) => {
    if (info.fileList.length > 0) {
      // Получаем информацию о загружаемом файле
      const uploadedFile = info.fileList[0];

      // Обновляем состояние с данными о файле
      setFile((prevFile) => ({
        ...prevFile,
        name: uploadedFile.name,
        imageUrl: uploadedFile.thumbUrl || "",
      }));
    }
  };
  const { push } = useRouter();

  // Отправляем post запрос
  const handleSubmit = async (value: ICourseCreation) => {
    const newFile = { ...file, name: value.name };

    // Достаем токен пользователя
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);

    const categoryId = 1;

    dispatch(courseCreation({ categoryId, value, parsedToken }));

    push("/addingSection/addingSection");

    // Сбрасываем поля объекта
    setFile({
      name: "",
      description: "",
      price: "",
      language: "",
    });
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
      <Form
        layout="vertical"
        form={form}
        name="add-course-form"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="name"
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
          name="price"
          label={"Цена"}
          rules={[
            {
              required: true,
              message: t.addingCourse[6],
            },
          ]}
        >
          <InputNumber min={1} max={12} />
        </Form.Item>

        <Form.Item name="language" label={t.addingCourse[5]}>
          <Select
            defaultValue={t.addingCourse[6]}
            options={[
              { value: "Русский", label: "Русский" },
              { value: "English", label: "English" },
            ]}
          />
        </Form.Item>

        <span className={s.error}>{error}</span>

        <Form.Item>
          <MyButton
            background="#03d665"
            hoverBackground="#7329c2"
            type="primary"
            loading={isLoading}
          >
            {t.addingCourse[8]}
          </MyButton>
        </Form.Item>
      </Form>
    </section>
  );
};

export default AddingCourse;
