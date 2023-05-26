import React, { FC } from "react";
import { Button, Modal } from "antd";

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
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default MyModal;
