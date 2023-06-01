import { useState, FC } from "react";
import s from "./AnimateSelect.module.scss";

import cn from "classnames";
import MyModal from "@/components/Modals/MyModal/MyModal";

interface IAnimateSelectProps {
  isModalOpen: boolean;
  setIsModalOpen: (active: boolean) => void;
}

const AnimateSelect: FC<IAnimateSelectProps> = ({isModalOpen, setIsModalOpen}) => {
  // Состояние - для select
  const [reveal, setReveal] = useState<boolean>(false);

  return (
    <div
      className={cn(s.select, { [s.reveal]: reveal })}
      onClick={() => setReveal(!reveal)}
    >
      <p>Подготовка к работе</p>
      <div
        className={s.select__line}
        onClick={(e) => e.stopPropagation()}
      ></div>
      <div className={s.select__hide} onClick={(e) => e.stopPropagation()}>
        <ul className={s.select__list}>
          <li onClick={() => setIsModalOpen(true)}>Курсы</li>
        </ul>

        <MyModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
    </div>
  );
};

export default AnimateSelect;
