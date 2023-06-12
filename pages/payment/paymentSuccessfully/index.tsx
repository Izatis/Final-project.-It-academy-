import React from "react";
import s from "./paymentSuccessfully.module.scss";

import Link from "next/link";
import { motion } from "framer-motion";

import MyButton from "@/components/UI/Buttons/MyButton/MyButton";

const Successfully = () => {
  return (
    <section className={s.successfully}>
      <motion.div
        className={s.successfully__content}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 2 }}
        variants={{
          visible: { opacity: 1, x: 0 },
          hidden: { opacity: 0, x: 100 },
        }}
      >
        <h2 className={s.successfully__title}>Оплата успешно прошла!</h2>

        <div className={s.successfully__buttons}>
          <Link href="/">
            <MyButton
              background="#7329c2"
              hoverBackground="#03d665"
              type="primary"
            >
              На главную
            </MyButton>
          </Link>
          <Link href="/setting/purchasedUserCourses">
            <MyButton
              background="#7329c2"
              hoverBackground="#03d665"
              type="primary"
            >
              Мои купленные курсы
            </MyButton>
          </Link>
          <Link href="/setting/userSettings">
            <MyButton
              background="#7329c2"
              hoverBackground="#03d665"
              type="primary"
            >
              На профиль
            </MyButton>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};
export default Successfully;
