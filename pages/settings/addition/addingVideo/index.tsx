import React, { FC, useEffect, useState } from "react";
import s from "./addingVideo.module.scss";

import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/redux";

import MyButton from "@/UI/Buttons/MyButton/MyButton";
import { useAddAVideoMutation } from "@/redux/reducers/s3";

const addingVideo: FC = () => {
  const { lessonIdBackend } = useAppSelector((state) => state.lessons);
  const [file, setSelectedFile] = useState(null);
  const { push } = useRouter();

  // const handleClick = async () => {
  //   const lessonId = lessonIdBackend;
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append("lessonId", lessonId);
  //     formData.append("file", file);
  //     fetch(
  //       "https://spring-boot-online-platform.herokuapp.com/s3/upload/video",
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     )
  //       .then(() => {
  //         push("/addition/addMore");
  //       })
  //       .catch((error) => {
  //         // Обработка ошибки
  //       });
  //   }
  // };

  // ---------------------------------------------------------------------------------------------------------------------------------
  // POST
  const [addAVideo, { isLoading }] = useAddAVideoMutation();

  const handleClick = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("lessonId", lessonIdBackend);
      formData.append("file", file);
      await addAVideo({ formData }).unwrap();
      push("/settings/addition/addMore");
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
          loading={isLoading}
        >
          Добавить
        </MyButton>
      </div>
    </section>
  );
};

export default addingVideo;
