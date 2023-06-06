import React, { FC, useEffect, useState } from "react";
import s from "./MyProfile.module.scss";

import { useRouter } from "next/router";
import Link from "next/link";
import { Modal, notification } from "antd";
import { UserOutlined, EditOutlined, LogoutOutlined } from "@ant-design/icons";
import en from "../../locales/EN/translation.json";
import ru from "../../locales/RU/translation.json";
import de from "../../locales/DE/translation.json";
import ch from "../../locales/CH/translation.json";
import fr from "../../locales/FR/translation.json";
import uk from "../../locales/UK/translation.json";
import { useDeletingAUserMutation } from "@/redux/reducers/user";
import { IUser } from "@/redux/types/user";

import Loading from "../Loading/Loading";
import MyButton from "../../UI/Buttons/MyButton/MyButton";

interface IMyProfileProps {
  user: IUser;
  isLoading: boolean;
}

const MyProfile: FC<IMyProfileProps> = ({ user, isLoading }) => {
  const [token, setToken] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { push, locale } = useRouter();
  const userId = user.id;

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, []);

  let t: any;
  switch (locale) {
    case "en":
      t = en;
      break;
    case "de":
      t = de;
      break;
    case "ch":
      t = ch;
      break;
    case "fr":
      t = fr;
      break;
    case "uk":
      t = uk;
      break;
    default:
      t = ru;
      break;
  }
  // Выйти из аккаунта
  const signOut = () => {
    push("/");
    localStorage.removeItem("token");
  };

  // ---------------------------------------------------------------------------------------------------------------------------------
  // DELETE
  const [deletingAUser, { isLoading: deletingAUserLoading }] =
    useDeletingAUserMutation();

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: any) => {
    api.info({
      message: `Ваш аккаунт удалено!`,
      placement,
    });
  };

  const handleDeletingAUser = async () => {
    push("/auth/signUp");
    await deletingAUser({ userId, token }).unwrap();
    localStorage.removeItem("token");
    openNotification(5);
  };

  return (
    <div className={s.myProfile}>
      {contextHolder}
      {isLoading ? (
        <div className={s.loading}>
          <Loading />
        </div>
      ) : (
        <div className={s.myProfile__content}>
          <Modal
            title="Изменить аватар"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={[
              <MyButton
                className={s.myProfile__buttonFirst}
                onClick={handleDeletingAUser}
                loading={deletingAUserLoading}
              >
                Удалить
              </MyButton>,
              <MyButton
                className={s.myProfile__buttonSecond}
                onClick={() => setIsModalOpen(false)}
              >
                Нет
              </MyButton>,
            ]}
          >
            Вы уверены?
          </Modal>

          <div className={s.container}>
            <ul className={s.myProfile__list}>
              <li className={s.myProfile__fullName}>{user.fullName}</li>
              <li className={s.myProfile__email}>{user.email}</li>
              <li className={s.myProfile__dateOfBirth}>{user.dateOfBirth}</li>
            </ul>

            <div>
              {user.role === "ROLE_ADMIN" && (
                <Link href={"/admin/adminPage"}>
                  <MyButton
                    className={s.myProfile__buttonFirst}
                    type="primary"
                    icon={<UserOutlined />}
                  >
                    Панель админа
                  </MyButton>
                </Link>
              )}

              <Link href={"/editing"}>
                <MyButton
                  className={s.myProfile__buttonSecond}
                  type="primary"
                  icon={<EditOutlined />}
                >
                  Редактировать
                </MyButton>
              </Link>
            </div>
          </div>

          <p className={s.text}>
            Рыбатекст используется дизайнерами, проектировщиками и
            фронтендерами, когда нужно быстро заполнить макеты или прототипы
            содержимым. Это тестовый контент, который не должен нести никакого
            смысла, лишь показать наличие самого текста или продемонстрировать
            типографику в деле.
          </p>

          <div className={s.myProfile__buttons}>
            <MyButton
              className={s.myProfile__buttonFirst}
              icon={<LogoutOutlined />}
              onClick={signOut}
            >
              Выйти
            </MyButton>

            <MyButton
              className={s.myProfile__buttonSecond}
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

export default MyProfile;