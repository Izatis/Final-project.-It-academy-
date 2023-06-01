import { useState, FC } from "react";
import s from "./AnimateSelect.module.scss";

import cn from "classnames";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toGetLessons } from "@/redux/reducers/course.slice";

import MyModal from "@/components/Modals/MyModal/MyModal";

interface IAnimateSelectProps {
  isModalOpen: boolean;
  setIsModalOpen: (active: boolean) => void;
}

const AnimateSelect: FC<IAnimateSelectProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  // Состояние - для select
  const [reveal, setReveal] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { sections, lessons } = useAppSelector((state) => state.course);

console.log(lessons);

  const handleClick = (id: number) => {
    // Достаем токен пользователя
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);

    setIsModalOpen(true);
    dispatch(toGetLessons({id, parsedToken}));
  };
  return (
    <div
      className={cn(s.select, { [s.reveal]: reveal })}
      onClick={() => setReveal(!reveal)}
    >
      <p>Разделы</p>
      <div
        className={s.select__line}
        onClick={(e) => e.stopPropagation()}
      ></div>
      <div className={s.select__hide} onClick={(e) => e.stopPropagation()}>
        {sections.map((section) => {
          return (
            <ul className={s.select__list}>
              <li onClick={() => handleClick(section.id)}>{section.name}</li>
            </ul>
          );
        })}

        <MyModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
    </div>
  );
};

export default AnimateSelect;
