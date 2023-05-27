import { useState } from "react";
import s from "./courseMore.module.scss";

import { courses, ICourses } from "../../constants/courses";

import Rating from "@/components/Rating/Rating";
import AnimateSelect from "@/components/MUI/AnimateSelect/AnimateSelect";
import Teacher from "@/components/Teacher/Teacher";
import MyButton from "@/components/MUI/Buttons/MyButton/MyButton";

export default function () {
  // Состояние - для карточек
  const [courseData, setCourseData] = useState<ICourses[]>(courses);

  return (
    <div className={s.course}>
      <aside>
        <video controls>
          <source
            src={
              "https://player.vimeo.com/external/564717097.sd.mp4?s=621cfbeb83c4f05b479962875e50127aad0d4775&profile_id=164&oauth2_token_id=57447761"
            }
            type="video/mp4"
          />
        </video>

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
          <AnimateSelect />
          <AnimateSelect />
          <AnimateSelect />
        </div>

        <Teacher />
      </div>
    </div>
  );
}
