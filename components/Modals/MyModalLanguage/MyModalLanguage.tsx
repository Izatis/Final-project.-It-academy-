import React, { FC } from "react";

import { useRouter } from "next/router";
import { Col, Modal, Row } from "antd";

import MyButton from "../../UI/Buttons/MyButton/MyButton";

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
    if (pathname === "/auth/registration") {
      push("/auth/registration", "/auth/registration", { locale });
    } else if (pathname === "/auth/authorization") {
      push("/auth/authorization", "/auth/authorization", { locale });
    } else if (pathname === "/passwordRecovery") {
      push("/passwordRecovery", "/passwordRecovery", { locale });
    } else if (pathname === "/setting") {
      push("/setting", "/setting", { locale });
    } else {
      push("/", "/", { locale });
    }
  };

  return (
    <Modal
      title="Выберите язык"
      open={isModalOpen}
      footer={null}
      onCancel={() => setIsModalOpen(!isModalOpen)}
    >
      <Row justify="center" gutter={[20, 30]} style={{ padding: 10 }}>
        <Col md={8} sm={12} xs={24}>
          <MyButton onClick={() => handleClick("en")} icon={"🇺🇸"} block>
            English
          </MyButton>
        </Col>
        <Col md={8} sm={12} xs={24}>
          <MyButton onClick={() => handleClick("de")} icon={"🇩🇪"} block>
            Español
          </MyButton>
        </Col>
        <Col md={8} sm={12} xs={24}>
          <MyButton onClick={() => handleClick("ru")} icon={"🇷🇺"} block>
            Russia
          </MyButton>
        </Col>
        <Col md={8} sm={12} xs={24}>
          <MyButton onClick={() => handleClick("ch")} icon={"🇨🇳"} block>
            China
          </MyButton>
        </Col>
        <Col md={8} sm={12} xs={24}>
          <MyButton onClick={() => handleClick("fr")} icon={"🇫🇷"} block>
            France
          </MyButton>
        </Col>
        <Col md={8} sm={12} xs={24}>
          <MyButton onClick={() => handleClick("uk")} icon={"🇺🇦"} block>
            Ukraine
          </MyButton>
        </Col>
      </Row>
    </Modal>
  );
};

export default MyModalLanguage;
