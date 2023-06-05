import React, { FC } from "react";
import s from "./Hero.module.scss";

import { useRouter } from "next/router";
import { motion } from "framer-motion";
import en from "../../locales/EN/translation.json";
import ru from "../../locales/RU/translation.json";
import de from "../../locales/DE/translation.json";
import ch from "../../locales/CH/translation.json";
import fr from "../../locales/FR/translation.json";
import uk from "../../locales/UK/translation.json";

const Hero: FC = () => {
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
    <section className={s.hero}>
      <div className={s.hero__title}>
        <div className={s.hero__title_container}>
          <motion.h1
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 2 }}
            variants={{
              visible: { opacity: 1, x: 0 },
              hidden: { opacity: 0, x: 100 },
            }}
          >
            {t.main[0]}
          </motion.h1>
        </div>

        <div className={s.hero__subTitle_container}>
          <motion.p
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 2 }}
            variants={{
              visible: { opacity: 1, x: 0 },
              hidden: { opacity: 0, x: 100 },
            }}
          >
            {t.main[1]}
          </motion.p>
        </div>
      </div>

      <div className={s.sky}>
        <div className={s.sun}>
          <img
            className={s.sunAnimated}
            src="https://assets.website-files.com/5de973c9519095863a2344df/5e3448b93087e0c52585ec62_sun.svg"
            alt="sun image"
          />
        </div>

        <div className={s.x1}>
          <div className={s.cloud}></div>
        </div>

        <div className={s.x2}>
          <div className={s.cloud}></div>
        </div>

        <div className={s.x3}>
          <div className={s.cloud}></div>
        </div>

        <div className={s.x4}>
          <div className={s.cloud}></div>
        </div>

        <div className={s.x5}>
          <div className={s.cloud}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
