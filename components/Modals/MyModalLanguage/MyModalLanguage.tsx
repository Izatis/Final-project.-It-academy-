import React, { FC } from "react";

import { useRouter } from "next/router";
import { Col, Modal, Row } from "antd";

import MyButton from "../../../UI/Buttons/MyButton/MyButton";

interface IMyModalLanguageProps {
  isModalOpen: boolean;
  setIsModalOpen: (active: boolean) => void;
}

const MyModalLanguage: FC<IMyModalLanguageProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  // Функции - для смены текста
  const { push, pathname } = useRouter();

  // Функции - для смены url
  const handleClick = (locale: string) => {
    setIsModalOpen(!isModalOpen);
    if (pathname === "/auth/signUp/signUp") {
      push("/auth/signUp/signUp", "/auth/signUp/signUp", { locale });
    } else if (pathname === "/auth/signIn/signIn") {
      push("/auth/signIn/signIn", "/auth/signIn/signIn", { locale });
    } else if (pathname === "/passwordRecovery/passwordRecovery") {
      push(
        "/passwordRecovery/passwordRecovery",
        "/passwordRecovery/passwordRecovery",
        { locale }
      );
    } else if (pathname === "/setting/setting") {
      push("/setting/setting", "/setting/setting", { locale });
    } else {
      push("/", "/", { locale });
    }
  };

  return (
    <Modal
      title="Выбрать язык"
      open={isModalOpen}
      footer={null}
      onCancel={() => setIsModalOpen(!isModalOpen)}
    >
      <Row justify="center" gutter={[20, 30]} style={{ padding: 10 }}>
        <Col xs={24} sm={12} md={8}>
          <MyButton onClick={() => handleClick("en")} icon={"🇺🇸"} block>
            English
          </MyButton>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <MyButton onClick={() => handleClick("de")} icon={"🇩🇪"} block>
            Deutsch
          </MyButton>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <MyButton onClick={() => handleClick("ru")} icon={"🇷🇺"} block>
            Russia
          </MyButton>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <MyButton onClick={() => handleClick("ch")} icon={"🇨🇳"} block>
            China
          </MyButton>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <MyButton onClick={() => handleClick("fr")} icon={"🇫🇷"} block>
            France
          </MyButton>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <MyButton onClick={() => handleClick("uk")} icon={"🇺🇦"} block>
            Ukraine
          </MyButton>
        </Col>
      </Row>
    </Modal>
  );
};

export default MyModalLanguage;
