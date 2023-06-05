import React, { FC, useState } from "react";
import s from "./userProfile.module.scss";

import Link from "next/link";
import { useRouter } from "next/router";
import { UserOutlined, EditOutlined, LogoutOutlined } from "@ant-design/icons";
import en from "../../locales/EN/translation.json";
import ru from "../../locales/RU/translation.json";
import de from "../../locales/DE/translation.json";
import ch from "../../locales/CH/translation.json";
import fr from "../../locales/FR/translation.json";
import uk from "../../locales/UK/translation.json";
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

          <div className={s.container}>
            <ul className={s.profile__list}>
              <li className={s.profile__fullName}>{user.fullName}</li>
              <li className={s.profile__email}>{user.email}</li>
              <li className={s.profile__dateOfBirth}>{user.dateOfBirth}</li>
            </ul>

            <div>
              {/* {user.role === "ROLE_ADMIN" && ( */}
                <Link href={"/admin/adminPage/adminPage"}>
                  <MyButton
                    className={s.profileFirst__button}
                    type="primary"
                    icon={<UserOutlined />}
                  >
                    Панель админа
                  </MyButton>
                </Link>
              {/* )} */}

              <Link href={"/editing/editing"}>
                <MyButton
                  className={s.profileSecond__button}
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
