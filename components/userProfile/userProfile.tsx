import React, { FC, useState } from "react";
import s from "./userProfile.module.scss";

import Link from "next/link";
import { useRouter } from "next/router";
import { EditOutlined, LogoutOutlined } from "@ant-design/icons";
import en from "../../locales/EN/translation.json";
import ru from "../../locales/RU/translation.json";
import { IUser } from "@/redux/types/user";

import Loading from "../Loading/Loading";
import MyButton from "../../UI/Buttons/MyButton/MyButton";
import { Modal } from "antd";

interface UserProfileProps {
  user: IUser;
  isLoading: boolean;
  onClick: (userId: number) => void;
  deletingAUserLoading: boolean;
}

const UserProfile: FC<UserProfileProps> = ({
  user,
  isLoading,
  onClick,
  deletingAUserLoading,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { push, locale } = useRouter();
  const t = locale === "ru" ? ru : en;

  // Выйти из аккаунта
  const signOut = () => {
    push("/");
    localStorage.removeItem("token");
  };

  return (
    <div className={s.profile}>
      {isLoading ? (
        <div className={s.loading}>
          <Loading />
        </div>
      ) : (
        <div className={s.profile__content}>
          <Modal
            title="Изменить аватар"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={[
              <MyButton
                className={s.profileFirst__button}
                onClick={() => onClick(user.id)}
                loading={deletingAUserLoading}
              >
                Удалить
              </MyButton>,
              <MyButton
                className={s.profileSecond__button}
                onClick={() => setIsModalOpen(false)}
              >
                Нет
              </MyButton>,
            ]}
          >
            Вы уверены?
          </Modal>
          <h2>Профили и настройки</h2>

          <div className={s.container}>
            <div className={s.fullName}>
              <h2>{user.fullName}</h2>
              <p>{user.email}</p>
            </div>

            <Link href={"/editing/editing"}>
              <MyButton
                background="#03d665"
                hoverBackground="#7329c2"
                type="primary"
                icon={<EditOutlined />}
              >
                Редактировать
              </MyButton>
            </Link>
          </div>

          <p className={s.text}>
            Рыбатекст используется дизайнерами, проектировщиками и
            фронтендерами, когда нужно быстро заполнить макеты или прототипы
            содержимым. Это тестовый контент, который не должен нести никакого
            смысла, лишь показать наличие самого текста или продемонстрировать
            типографику в деле.
          </p>

          <div className={s.profile__buttons}>
            <MyButton
              className={s.profileFirst__button}
              icon={<LogoutOutlined />}
              onClick={signOut}
            >
              Выйти
            </MyButton>

            <MyButton
              className={s.profileSecond__button}
              icon={<LogoutOutlined />}
              onClick={() => setIsModalOpen(true)}
            >
              Удалить аккаунт
            </MyButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
