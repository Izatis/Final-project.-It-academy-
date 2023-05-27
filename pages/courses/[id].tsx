import { useState } from "react";
import s from "./courses.module.scss";

import { courses, ICourses} from "../../constants/courses";

import Rating from "@/components/Rating/Rating";
import AnimateSelect from "@/components/MUI/AnimateSelect/AnimateSelect";
import Teacher from "@/components/Teacher/Teacher";
import MyButton from "@/components/MUI/Buttons/MyButton/MyButton";

export default function () {
  // Состояние - для карточек
  const [coursesData, setCoursesData] = useState<ICourses[]>(courses);

  return (
    <div className={s.courses}>
      <div>
        <ul className={s.hero__list}>
          <li>
            <h2>Полный курс по JavaScript + React - с нуля до результата</h2>
          </li>
          <li className={s.courses__desciption}>
            Освойте самый популярный язык программирования - JavaScript,
            библиотеку React и научись применять на практике!
          </li>
          <li>
            <Rating value={3.5} />
          </li>
          <li className={s.card__creator}>Авторы: Иван Петриченко</li>
          <li className={s.courses__duration}>Последнее обновление: 03.2023</li>
          <li>Russia</li>
        </ul>

        <div className={s.info}>
          <h2>Чему вы научитесь</h2>

          <ul className={s.info_list}>
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

        <div className={s.materials}>
          <h2>Материалы курса</h2>
          <AnimateSelect />
          <AnimateSelect />
          <AnimateSelect />
        </div>

        <Teacher/>
      </div>

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
          <MyButton
            background="#7329c2"
            hoverBackground="#03d665"
            type="primary"
          >
            Добавить в корзину
          </MyButton>
          <h3>Этот курс включает:</h3>

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
    </div>
  );
}
