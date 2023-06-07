import { useState, FC } from "react";
import s from "./AnimateSelect.module.scss";

import cn from "classnames";
import { useAppDispatch } from "@/hooks/redux";

import MyModalVideo from "@/components/Modals/MyModalVideo/MyModalVideo";
import { useToGetLessonsQuery } from "@/redux/reducers/lesson";

interface IAnimateSelectProps {
  section: any;
}

const AnimateSelect: FC<IAnimateSelectProps> = ({ section }) => {
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [reveal, setReveal] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  // const { lessons } = useAppSelector((state) => state.lessons);

  const sectionId = section.id;
  const token = JSON.parse(localStorage.getItem("token") as string);
  const { data: lessons = [] } = useToGetLessonsQuery({
    token,
    sectionId,
  });
  const handleClick = (id: number) => {
    setSelectedLessonId(id);
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
        <ul className={s.select__list}>
          {lessons.map((lesson: any) => {
            return (
              <>
                <li onClick={() => handleClick(lesson.id)}>{lesson.title}</li>
                <MyModalVideo
                  lesson={lesson}
                  isModalOpen={lesson.id === selectedLessonId && isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                />
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AnimateSelect;
