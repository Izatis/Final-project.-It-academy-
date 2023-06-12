import { useState, FC } from "react";
import s from "./AnimateSelect.module.scss";

import cn from "classnames";

import MyModalVideo from "@/components/Modals/MyModalVideo/MyModalVideo";
import { useToGetLessonsQuery } from "@/redux/reducers/lesson";
import { Tooltip } from "antd";

interface IAnimateSelectProps {
  section: any;
  isPurchase: boolean | null;
}

const AnimateSelect: FC<IAnimateSelectProps> = ({ section, isPurchase }) => {
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [reveal, setReveal] = useState<boolean>(false);
  const sectionId = section.id;
  const token = JSON.parse(localStorage.getItem("token") as string);
  const handleClick = (id: number) => {
    setSelectedLessonId(id);
    setIsModalOpen(true);
  };

  console.log(isPurchase);
  
  // ---------------------------------------------------------------------------------------------------------------------------------
  // GET
  const { data: lessons = [] } = useToGetLessonsQuery({
    token,
    sectionId,
  });
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
                {isPurchase ? (
                  <li
                    className={s.isPurchaseActive}
                    onClick={() => handleClick(lesson.id)}
                  >
                    <Tooltip
                      title="Нажмите чтобы посмотреть курс"
                      placement="rightTop"
                    >
                      {lesson.title}
                    </Tooltip>
                  </li>
                ) : (
                  <li className={s.isPurchaseDisabled}>
                    <Tooltip
                      title="Купите чтобы посмотреть курс"
                      placement="rightTop"
                    >
                      {lesson.title}
                    </Tooltip>
                  </li>
                )}

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
