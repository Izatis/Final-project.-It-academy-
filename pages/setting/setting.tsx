import React, { ChangeEvent, FC, useEffect, useState } from "react";
import s from "./setting.module.scss";

import { useRouter } from "next/router";
import Image from "next/image";
import { Avatar, Modal, Tooltip, notification } from "antd";
import cover from "../../public/cover.png";

import UserProfile from "../../components/userProfile/userProfile";
import Aside from "@/components/Aside/Aside";
import {
  useDeletingAUserMutation,
  useGetUserQuery,
} from "@/redux/reducers/user";
import MyButton from "@/UI/Buttons/MyButton/MyButton";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useChangeAvatarMutation } from "@/redux/reducers/s3";

const Setting: FC = () => {
  const [token, setToken] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  
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
  const [changeAvatar] = useChangeAvatarMutation();
  const { data: user = {}, isLoading } = useGetUserQuery({ token });
  const userId = user.id;

  const handleClick = async () => {
    if (avatar) {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("file", avatar);
      console.log(avatar, userId);
      fetch(
        "https://spring-boot-online-platform.herokuapp.com/s3/upload/user/image",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      )
        .then((response) => {
          // Обработка успешного ответа сервера
        })
        .catch((error) => {
          console.log(error);

          // Обработка ошибки
        });
      // await changeAvatar({ token, formData }).unwrap();
    }
  };

  // ---------------------------------------------------------------------------------------------------------------------------------
  const [deletingAUser, { isLoading: deletingAUserLoading }] =
    useDeletingAUserMutation();

  // DELETE

  const handleDeletingAUser = async (userId: number) => {
    console.log(userId, token);

    push("/signUp/signUp");
    await deletingAUser({ userId, token }).unwrap();
    localStorage.removeItem("token");
    openNotification(5);
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: any) => {
    api.info({
      message: `Ваш аккаунт удалено!`,
      placement,
    });
  };

  return (
    <section className={s.setting}>
      {contextHolder}
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
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAvatar(e.target.value)
          }
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
      <UserProfile
        user={user}
        isLoading={isLoading}
        onClick={handleDeletingAUser}
        deletingAUserLoading={deletingAUserLoading}
      />
    </section>
  );
};

export default Setting;
