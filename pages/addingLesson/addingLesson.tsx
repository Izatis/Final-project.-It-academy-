import React, { FC, useEffect, useState } from "react";
import s from "./AddingLesson.module.scss";

import Link from "next/link";
import { UploadOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { Button, Form, Input, InputNumber, Upload, UploadFile } from "antd";
import en from "../../locales/EN/translation.json";
import ru from "../../locales/RU/translation.json";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
UploadOutlined;
import MyButton from "@/components/UI/Buttons/MyButton/MyButton";
import { addingALesson } from "@/redux/reducers/lesson.slice";

interface IFile {
  title: string;
  description: string;
  duration: any;
}

const AddingLesson: FC = () => {
  // Состояния - для данных
  const [file, setFile] = useState<IFile>({
    title: "JavaScript",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet culpa corrupti, itaque exercitationem temporibus quos iste recusandae quis tempore consequuntur consequatur corporis beatae saepe facere illum perferendis quisquam. Reprehenderit, iusto!",
    duration: 0,
  });

  // Для - маршутизации
  const { locale } = useRouter();

  // Функции - для смены текста
  const t = locale === "ru" ? ru : en;

  const dispatch = useAppDispatch();
  const { sectionIdBackend, isLoading, error } = useAppSelector(
    (state) => state.section
  );
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
  const handleSubmit = async (value: IFile) => {
    // Достаем токен пользователя
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);

    const sectionId = sectionIdBackend;

    dispatch(addingALesson({ sectionId, value, parsedToken }));
    push("/addAnotherSection/addAnotherSection");

    // Сбрасываем поля объекта
    setFile({
      title: "",
      description: "",
      duration: "",
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
      <h2>Добавление урока</h2>
      <Form
        layout="vertical"
        form={form}
        name="add-course-form"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="title"
          label={"Название урока"}
          rules={[
            {
              required: true,
              message: t.addingCourse[6],
            },
          ]}
        >
          <Input.TextArea placeholder={"Название урока"} />
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
          name="duration"
          label={"Длительность урока"}
          rules={[
            {
              required: true,
              message: t.addingCourse[6],
            },
          ]}
        >
          <InputNumber min={1} max={12} />
        </Form.Item>

        <Form.Item
          label={t.addingCourse[3]}
          name="video"
          //   rules={[
          //     {
          //       required: true,
          //       message: t.addingCourse[5],
          //     },
          //   ]}
        >
          <Upload listType="picture" defaultFileList={[...fileList]}>
            <Button icon={<UploadOutlined />}>Загрузить видео</Button>
          </Upload>
          <br />
          <br />
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

export default AddingLesson;
