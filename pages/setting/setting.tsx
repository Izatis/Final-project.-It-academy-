import React, { FC, useState } from "react";
import s from "./setting.module.scss";

import Image from "next/image";
import { Avatar, Modal, Tooltip } from "antd";
import cover from "../../public/cover.png";

import UserProfile from "../../components/userProfile/userProfile";
import Aside from "@/components/Aside/Aside";

const Setting: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <section className={s.setting}>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <input type="file" />
      </Modal>
      <div className={s.setting__static}>
        <Image className={s.coverFirst} src={cover} alt="cover" />
        <div className={s.coverSecond}></div>

        <Tooltip title="Изменить фото профиля">
          <Avatar
            className={s.setting__avatar}
            src={"https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"}
            onClick={() => setIsModalOpen(true)}
          />
        </Tooltip>

        <Aside />
      </div>
      <UserProfile />
    </section>
  );
};

export default Setting;
