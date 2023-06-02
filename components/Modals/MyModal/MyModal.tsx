import React, { FC } from "react";
import s from "./MyModal.module.scss";

import { Modal } from "antd";
import { ILesson } from "@/redux/types/lesson";

interface IMyModalLanguageProps {
  lesson: ILesson;
  isModalOpen: boolean;
  setIsModalOpen: (active: boolean) => void;
}

const MyModal: FC<IMyModalLanguageProps> = ({
  lesson,
  isModalOpen,
  setIsModalOpen,
}) => {
  console.log(lesson.videoUrl);

  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      onOk={() => setIsModalOpen(false)}
    >
      <video width="450" height="300" controls poster="video/duel.jpg">
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
      {/* <video controls className={s.video}>
      </video> */}
    </Modal>
  );
};

export default MyModal;
