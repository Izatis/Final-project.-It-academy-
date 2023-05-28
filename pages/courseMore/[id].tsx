import { useState } from "react";
import s from "./courseMore.module.scss";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import poster from "../../public/design.png";

import Rating from "@/components/Rating/Rating";
import AnimateSelect from "@/components/MUI/AnimateSelect/AnimateSelect";
import MyButton from "@/components/MUI/Buttons/MyButton/MyButton";
import TeacherCard from "@/components/TeacherCard/TeacherCard";

export default function () {
  // Состояние - для модалки
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <div className={s.course}>
      <aside>
        <div
          className={s.course__poster}
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <FontAwesomeIcon className={s.course__play} icon={faCirclePlay} />
          <span>Просмотреть этот курс</span>
          <Image src={poster} alt="poster" />

          <div className={s.blackout}></div>
        </div>

        <div className={s.aside__body}>
          <span className={s.aside_price}>9,99 $</span>
          <MyButton className={s.aside__button}>Добавить в корзину</MyButton>

          <MyButton className={s.aside__subButton}>Купить сейчас</MyButton>
          <b>Этот курс включает:</b>

          <ul className={s.aside__list}>
            <li>66,5 ч видео по запросу</li>
            <li>22 упражнений по написанию кода</li>
            <li>2 практических тестов</li>
            <li>8 статей</li>
            <li>80 ресурсов для скачивания</li>
            <li>Доступ через мобильные устройства и телевизор</li>
            <li>Полный пожизненный доступ</li>
            <li>Сертификат об окончании</li>
          </ul>
        </div>
      </aside>

      <div className={s.right__block}>
        <ul className={s.course__list}>
          <li className={s.course__title}>
            Полный курс по JavaScript + React - с нуля до результата
          </li>
          <li className={s.course__desciption}>
            Освойте самый популярный язык программирования - JavaScript,
            библиотеку React и научись применять на практике!
          </li>
          <li className={s.course__creator}>Авторы: Иван Петриченко</li>
          <li className={s.course__rating}>
            <pre>400</pre> <Rating value={3.5} />
          </li>
          <li className={s.course__duration}>Последнее обновление: 03.2023</li>
          <li className={s.course__language}>Russia</li>
        </ul>

        <div className={s.course__info}>
          <b>Чему вы научитесь</b>

          <ul className={s.info__list}>
            <li>Узнаете основы программирования и алгоритмов</li>
            <li>Изучите такие популярные технологии как AJAX, JSON и тд</li>
            <li>
              Научитесь работать с npm, Babel, Browserify, Webpack, Heroku,
              Firebase и тд
            </li>
            <li>
              Изучите библиотеку React и абсолютно все, что с ней связано (в том
              числе и Redux)
            </li>
            <li>Закрепите всё, что узнали на реальных проектах</li>
            <li>
              Узнаете основные концепции и принципы JavaScript, от самых простых
              до самых сложных
            </li>
            <li>Научитесь работать с Git и GitHub</li>
            <li>
              Узнаете, какой фрэймворк или библиотеку выбрать в дальнейшем.
              Познакомишься с React, Angular, Vue, Jquery
            </li>
            <li>Научитесь создавать полноценные web-приложения</li>
          </ul>
        </div>

        <div className={s.course__materials}>
          <b>Материалы курса</b>
          <AnimateSelect
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
          <AnimateSelect
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
          <AnimateSelect
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </div>

        <TeacherCard/>
      </div>
    </div>
  );
}
