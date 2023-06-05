import React, { FC, useEffect, useState } from "react";
import s from "./setting.module.scss";

import Image from "next/image";
import { Avatar, Modal, Tooltip } from "antd";
import {
  useGetUserQuery,
} from "@/redux/reducers/user";
import { useChangeAvatarMutation } from "@/redux/reducers/s3";
import cover from "../../public/cover.png";

import Aside from "@/components/Aside/Aside";
import MyButton from "@/UI/Buttons/MyButton/MyButton";
import MyProfile from "@/components/MyProfile/MyProfile";

const Setting: FC = () => {
  const [token, setToken] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, []);

  useEffect(() => {
    const fullUrl = window.location.href;
    const token = fullUrl.split(
      "http://localhost:3000/setting/setting?token="
    )[1];
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
    }
  }, []);

  // ---------------------------------------------------------------------------------------------------------------------------------
  // POST
  const [avatar, setAvatar] = useState(null);
  const [changeAvatar] = useChangeAvatarMutation();
  const { data: user = {}, isLoading } = useGetUserQuery({ token });
  const userId = user.id;

  const handleClick = async () => {
    setIsModalOpen(false);
    window.location.reload();
    if (avatar) {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("file", avatar);
      await changeAvatar({ formData }).unwrap();
    }
  };

  return (
    <section className={s.setting}>
      <Modal
        title="Изменить аватар"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <MyButton
            background="#7329c2"
            hoverBackground="#03d665"
            type="primary"
            onClick={handleClick}
          >
            Изменить
          </MyButton>,
        ]}
      >
        <input
          type="file"
          accept="picture/*"
          onChange={(e: any) => setAvatar(e.target.files[0])}
        />
      </Modal>
      <div className={s.setting__static}>
        <Image className={s.coverFirst} src={cover} alt="cover" />
        <div className={s.coverSecond}></div>

        <Tooltip title="Изменить фото профиля">
          <Avatar
            className={s.setting__avatar}
            src={user.imageUrl}
            alt={user.imageName}
            onClick={() => setIsModalOpen(true)}
          />
        </Tooltip>

        <Aside />
      </div>
      <MyProfile
        user={user}
        isLoading={isLoading}
      />
    </section>
  );
};

export default Setting;
