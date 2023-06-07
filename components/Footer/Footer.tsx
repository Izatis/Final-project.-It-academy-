import React, { FC } from "react";
import s from "./Footer.module.scss";

import { useRouter } from "next/router";
import { faGraduationCap, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTelegram } from "@fortawesome/free-brands-svg-icons";
import en from "../../locales/EN/translation.json";
import ru from "../../locales/RU/translation.json";
import de from "../../locales/DE/translation.json";
import ch from "../../locales/CH/translation.json";
import fr from "../../locales/FR/translation.json";
import uk from "../../locales/UK/translation.json";

const Footer: FC = () => {
  const { locale } = useRouter();
  let t: any;
  switch (locale) {
    case "en":
      t = en;
      break;
    case "de":
      t = de;
      break;
    case "ch":
      t = ch;
      break;
    case "fr":
      t = fr;
      break;
    case "uk":
      t = uk;
      break;
    default:
      t = ru;
      break;
  }

  return (
    <footer className={s.footer} id="contacts">
      <div className={s.footer__content}>
        <div className={s.footer__contacts}>
          <FontAwesomeIcon className={s.footer__logo} icon={faGraduationCap} />

          <p>{t.footer.title}</p>

          <ul className={s.footer__socialMedia}>
            <li>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  className={s.footer__social}
                  icon={faInstagram}
                />
              </a>
            </li>
            <li>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon className={s.footer__social} icon={faPhone} />
              </a>
            </li>
            <li>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  className={s.footer__social}
                  icon={faTelegram}
                />
              </a>
            </li>
          </ul>
        </div>

        <ul className={s.footer__list}>
          <li className={s.footer__title}> {t.footer.ulFirst[0]}</li>

          <li>
            <a href="#"> {t.footer.ulFirst[1]}</a>
          </li>

          <li>
            <a href="#"> {t.footer.ulFirst[2]}</a>
          </li>

          <li>
            <a href="#"> {t.footer.ulFirst[3]}</a>
          </li>

          <li>
            <a href="#"> {t.footer.ulFirst[4]}</a>
          </li>
        </ul>

        <ul className={s.footer__list}>
          <li className={s.footer__title}> {t.footer.ulSecond[0]}</li>

          <li>
            <a href="#">{t.footer.ulSecond[1]}</a>
          </li>

          <li>
            <a href="#">{t.footer.ulSecond[2]}</a>
          </li>

          <li>
            <a href="#">{t.footer.ulSecond[3]}</a>
          </li>

          <li>
            <a href="#">{t.footer.ulSecond[4]}</a>
          </li>
        </ul>

        <ul className={s.footer__list}>
          <li className={s.footer__title}>{t.footer.ulThird[0]}</li>

          <li>
            <a href="#">{t.footer.ulThird[1]}</a>
          </li>

          <li>
            <a href="#">{t.footer.ulThird[2]}</a>
          </li>

          <li>
            <a href="#">{t.footer.ulThird[3]}</a>
          </li>

          <li>
            <a href="#">{t.footer.ulThird[4]}</a>
          </li>
        </ul>

        <ul className={s.footer__list}>
          <li className={s.footer__title}>{t.footer.ulFour[0]}</li>

          <li>
            {t.footer.ulFour[1]}
            <a href="#">{t.footer.ulFour[2]}</a>
          </li>
        </ul>
      </div>

      <footer className={s.subFooter}>
        <FontAwesomeIcon className={s.subFooter__logo} icon={faGraduationCap} />

        <p>© 2023 Izatis, Inc.</p>
      </footer>
    </footer>
  );
};

export default Footer;
