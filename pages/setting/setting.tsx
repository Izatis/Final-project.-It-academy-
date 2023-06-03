import React, { FC, useEffect, useState } from "react";
import s from "./setting.module.scss";
import { UserOutlined } from "@ant-design/icons";

import Image from "next/image";
import {  Avatar, Modal, Tooltip } from "antd";
import cover from "../../public/cover.png";

import UserProfile from "../../components/userProfile/userProfile";
import Aside from "@/components/Aside/Aside";

import { fetchUser, getAllUserCourses } from "@/redux/reducers/user.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

const Setting: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dispatch = useAppDispatch();


  // Отправляет get запрос для получения пользователя
  useEffect(() => {
    // Достаем токен пользователя
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
  
    dispatch(fetchUser(parsedToken));
  }, []);
  const firstName: string = "John"; // Замените на реальное имя пользователя



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
            className={s.setting__avatar} icon={<UserOutlined />}
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
