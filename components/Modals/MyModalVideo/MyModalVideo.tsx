import React, { FC } from "react";
import s from "./MyModalVideo.module.scss";

import { Form, Input, Modal } from "antd";
import { ILesson } from "@/redux/types/lesson";
import MyInput from "@/components/UI/MyInput/MyInput";

interface IMyModalVideoProps {
  lesson: ILesson;
  isModalOpen: boolean;
  setIsModalOpen: (active: boolean) => void;
}

const MyModalVideo: FC<IMyModalVideoProps> = ({
  lesson,
  isModalOpen,
  setIsModalOpen,
}) => {
  return (
    <Modal
      title={lesson.title}
      open={isModalOpen}
      keyboard={true}
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
    >
      <video className={s.video} controls>
        <source
          src={lesson.videoUrl}
          type='video/ogg; codecs="theora, vorbis"'
        />
        <source
          src={lesson.videoUrl}
          type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
        />
        <source src={lesson.videoUrl} type='video/webm; codecs="vp8, vorbis"' />
        <source type="video/mp4" src={lesson.videoUrl} />
      </video>

      {/* <b>Оставьте комментарию</b>
      <Form form={form} name="comment-form" onFinish={handleSubmit}>
        <Form.Item
          className={s.authorization__deIndenting}
          name="title"
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите поле",
            },
          ]}
        >
          <Input placeholder="title" />
        </Form.Item>
        <Form.Item
          className={s.authorization__deIndenting}
          name="description"
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите поле",
            },
          ]}
        >
          <Input placeholder="description" />
        </Form.Item>
      </Form> */}

      <p className={s.video__description}>{lesson.description}</p>
    </Modal>
  );
};

export default MyModalVideo;
