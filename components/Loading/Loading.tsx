import React, { FC } from "react";
import s from "./Loading.module.scss";

const Loading: FC = () => {
  return (
    <div className={s.loading}>
      <div className={s.loading__content}></div>
    </div>
  );
};

export default Loading;
