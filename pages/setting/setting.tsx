import React, { FC } from "react";
import s from "./setting.module.scss";

import Link from "next/link";
import Image from "next/image";
import cover from "../../public/cover.png";
import avatar from "../../public/avatar.jpeg";

import UserProfile from "../../components/userProfile/userProfile";
import Aside from "@/components/Aside/Aside";

const Setting: FC = () => {
  return (
    <section className={s.setting}>
      <div className={s.setting__static}>
        <Image className={s.coverFirst} src={cover} alt="cover" />
        <div className={s.coverSecond}></div>
        <Image className={s.avatar} src={avatar} alt="avatar" />

        <Aside />
      </div>

      <UserProfile />
    </section>
  );
};

export default Setting;
