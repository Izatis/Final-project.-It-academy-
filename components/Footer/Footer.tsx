import React, { FC } from "react";
import s from "./Footer.module.scss";

import { faGraduationCap, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTelegram } from "@fortawesome/free-brands-svg-icons";

const Footer: FC = () => {
  return (
    <footer className={s.footer} id="contacts">
      <div className={s.footer__content}>
        <div className={s.footer__contacts}>
          <FontAwesomeIcon className={s.footer__logo} icon={faGraduationCap} />

          <p>
            Образовательная онлайн-платформа для развития и тренировки навыков в
            сфере информационных технологий
          </p>

          <div className={s.footer__socialMedia}>
            <FontAwesomeIcon className={s.footer__social} icon={faInstagram} />
            <FontAwesomeIcon className={s.footer__social} icon={faPhone} />
            <FontAwesomeIcon className={s.footer__social} icon={faTelegram} />
          </div>
        </div>

        <ul className={s.footer__list}>
          <li className={s.footer__title}>Обучение</li>

          <li>
            <a href="#">Курсы</a>
          </li>

          <li>
            <a href="#">Вебинары</a>
          </li>

          <li>
            <a href="#">Тренажеры</a>
          </li>

          <li>
            <a href="#">Воркшопы</a>
          </li>
        </ul>

        <ul className={s.footer__list}>
          <li className={s.footer__title}>О нас</li>

          <li>
            <a href="#">О платформе</a>
          </li>

          <li>
            <a href="#">Преподаватели</a>
          </li>

          <li>
            <a href="#">Тарифы</a>
          </li>

          <li>
            <a href="#">Отзывы</a>
          </li>
        </ul>

        <ul className={s.footer__list}>
          <li className={s.footer__title}>Контакты</li>

          <li>
            <a href="#">Связаться с нами</a>
          </li>

          <li>
            <a href="#">Консультация</a>
          </li>

          <li>
            <a href="#">Реквизиты</a>
          </li>

          <li>
            <a href="#">Поддержка</a>
          </li>
        </ul>

        <ul className={s.footer__list}>
          <li className={s.footer__title}>Возникли вопросы?</li>

          <li>
            <a href="#">Напишите нам на почту test@gmail.com</a>
          </li>
        </ul>
      </div>

      <footer className={s.subFooter}>
        <FontAwesomeIcon className={s.subFooter__logo} icon={faGraduationCap}/>

        <p>© 2023 Izatis, Inc.</p>
      </footer>
    </footer>
  );
};

export default Footer;
