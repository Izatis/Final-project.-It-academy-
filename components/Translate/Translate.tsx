import React, { FC, useState } from "react";
import s from "./Translate.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

import MyModal from "../MyModal/MyModal";
import MyButton from "../MUI/MyButton/MyButton";

const Translate: FC = () => {
  // Состояние - для модалки
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <div className={s.header__languageButton}>
      <MyModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

      <MyButton
        background="#7329c2"
        hoverBackground="#03d665"
        onClick={() => setIsModalOpen(true)}
      >
        <FontAwesomeIcon icon={faGlobe} />
      </MyButton>
    </div>
  );
};

export default Translate;
