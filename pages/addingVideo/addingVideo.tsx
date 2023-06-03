import React, { FC, useEffect, useState } from "react";
import s from "./addingVideo.module.scss";

import Link from "next/link";
import { UploadOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { Button, Form, Input, InputNumber, Upload } from "antd";
import en from "../../locales/EN/translation.json";
import ru from "../../locales/RU/translation.json";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import MyButton from "@/components/UI/Buttons/MyButton/MyButton";
import { addingALesson } from "@/redux/reducers/lesson.slice";
import { IAddingALesson } from "@/redux/types/lesson";
import { addingAVideo } from "@/redux/reducers/s3.slice";

const addingVideo = () => {
  const dispatch = useAppDispatch();
  const { lessonIdBackend } = useAppSelector((state) => state.lesson);

  const [file, setSelectedFile] = useState(null);

  // const handleFileChange = (event: any) => {
  //   setSelectedFile(event.target.files[0]);
  // };
  // dispatch(addingAVideo({ lessonId, file, parsedToken }));
  // const parsedToken = JSON.parse(localStorage.getItem("token") as string);

  const handleSubmit = async (event: any) => {
    const lessonId = lessonIdBackend;
    if (event.target.files[0]) {
      const formData = new FormData();
      formData.append("lessonId", lessonId);
      formData.append("file", event.target.files[0]);

      console.log(formData);

      fetch(
        "https://spring-boot-online-platform.herokuapp.com/s3/upload/video",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => {
          // Обработка успешного ответа сервера
        })
        .catch((error) => {
          // Обработка ошибки
        });
    }
  };
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...form.getFieldsValue() });
  }, []);
  return (
    <section className={s.signIn}>
      <h2>Добавление видео к уроку</h2>
      {/* <Form
        layout="vertical"
        form={form}
        name="add-course-form"
        onFinish={handleSubmit}
      >
        <Form.Item name="file" label="Загрузить файл"> */}
      <input type="file" accept="video/*" onChange={handleSubmit} />
      {/* </Form.Item>

        <Form.Item>
          <MyButton
            background="#03d665"
            hoverBackground="#7329c2"
            type="primary"
            // loading={isLoading}
          >
            Добавить
          </MyButton>
        </Form.Item>
      </Form> */}
    </section>
  );
};

export default addingVideo;
