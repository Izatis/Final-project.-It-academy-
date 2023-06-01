import React, { FC } from "react";
import s from "./MyModal.module.scss";

import { Modal } from "antd";

interface IMyModalLanguageProps {
  isModalOpen: boolean;
  setIsModalOpen: (active: boolean) => void;
}

const MyModal: FC<IMyModalLanguageProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      onOk={() => setIsModalOpen(false)}
    >
      <video controls className={s.video}>
        <source
          type="video/mp4"
          src={
            "https://player.vimeo.com/external/564717097.sd.mp4?s=621cfbeb83c4f05b479962875e50127aad0d4775&profile_id=164&oauth2_token_id=57447761"
          }
        />
      </video>
    </Modal>
  );
};

export default MyModal;
