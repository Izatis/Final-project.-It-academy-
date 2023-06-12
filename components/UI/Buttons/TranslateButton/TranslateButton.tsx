import React, { FC, useState } from "react";
import s from "./TranslateButton.module.scss";

import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

import MyModal from "../../../Modals/MyModalLanguage/MyModalLanguage";
import MyButton from "../MyButton/MyButton";

interface ITranslateButton {
  className?: any;
}

const TranslateButton: FC<ITranslateButton> = ({ className }) => {
  // Состояние - для модалки
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className={cn(s.translate, className)}>
      <MyModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

      <MyButton
        background="#7329c2"
        hoverBackground="#03d665"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <FontAwesomeIcon icon={faGlobe} />
      </MyButton>
    </div>
  );
};

export default TranslateButton;
