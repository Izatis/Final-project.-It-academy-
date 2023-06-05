import React, { FC, useState } from "react";
import s from "./addingVideo.module.scss";

import Link from "next/link";
import { UploadOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { Button, Form, Input, InputNumber, Upload } from "antd";
import en from "../../../locales/EN/translation.json";
import ru from "../../../locales/RU/translation.json";
import de from "../../../locales/DE/translation.json";
import ch from "../../../locales/CH/translation.json";
import fr from "../../../locales/FR/translation.json";
import uk from "../../../locales/UK/translation.json";
import { useAppSelector } from "@/hooks/redux";
import MyButton from "@/UI/Buttons/MyButton/MyButton";
import { addingALesson } from "@/redux/reducers/lesson.slice";
import { IAddingALesson } from "@/redux/types/lesson";

const addingVideo: FC = () => {
  const { lessonIdBackend } = useAppSelector((state) => state.lessons);
  const [file, setSelectedFile] = useState(null);
  const { push } = useRouter();

  const handleClick = async () => {
    const lessonId = lessonIdBackend;
    if (file) {
      const formData = new FormData();
      formData.append("lessonId", lessonId);
      formData.append("file", file);
      fetch(
        "https://spring-boot-online-platform.herokuapp.com/s3/upload/video",
        {
          method: "POST",
          body: formData,
        }
      )
        .then(() => {
          push("/addition/addMore/addMore");
        })
        .catch((error) => {
          // Обработка ошибки
        });
    }
  };

  return (
    <section className={s.addingVideo}>
      <h2>Добавление видео к уроку</h2>

      <input
        type="file"
        accept="video/*"
        onChange={(e: any) => setSelectedFile(e.target.files[0])}
      />

<div className={s.addingVideo__button}>
      <MyButton
        background="#03d665"
        hoverBackground="#7329c2"
        type="primary"
        onClick={handleClick}
        // loading={isLoading}
      >
        Добавить
      </MyButton>
</div>
    </section>
  );
};

export default addingVideo;
