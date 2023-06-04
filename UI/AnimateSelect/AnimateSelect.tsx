import { useState, FC, useEffect } from "react";
import s from "./AnimateSelect.module.scss";

import cn from "classnames";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import MyModal from "@/components/Modals/MyModal/MyModal";
import { toGetLessons } from "@/redux/reducers/lesson.slice";

interface IAnimateSelectProps {
  section: any;
}

const AnimateSelect: FC<IAnimateSelectProps> = ({ section }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [reveal, setReveal] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { lessons } = useAppSelector((state) => state.lesson);

  useEffect(() => {
    const id = section.id;
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    dispatch(toGetLessons({ id, parsedToken }));
  }, []);

  const handleClick = (id: number) => {
    setIsModalOpen(true);
  };
  return (
    <div
      className={cn(s.select, { [s.reveal]: reveal })}
      onClick={() => setReveal(!reveal)}
    >
      <p>{section.name}</p>
      <div
        className={s.select__line}
        onClick={(e) => e.stopPropagation()}
      ></div>
      <div className={s.select__hide} onClick={(e) => e.stopPropagation()}>
        {lessons.map((lesson) => {
          return (
            <>
              <ul className={s.select__list}>
                <li onClick={() => handleClick(lesson.id)}>{lesson.title}</li>
              </ul>
              <MyModal
                lesson={lesson}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default AnimateSelect;
