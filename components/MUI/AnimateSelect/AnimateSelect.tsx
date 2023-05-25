import { useState, MouseEvent, FC } from "react";
import s from "./AnimateSelect.module.scss";

import cn from "classnames";
import Link from "next/link";

const AnimateSelect: FC = () => {
  const [reveal, setReveal] = useState(false);

  return (
    <div
      className={cn(s.select, { [s.reveal]: reveal })}
      onClick={() => setReveal(!reveal)}
    >
      <p>Подготовка к работе</p>
      <div
        className={s.select__line}
        onClick={(e) => e.stopPropagation()}
      ></div>
      <div className={s.select__hide} onClick={(e) => e.stopPropagation()}>
        <Link href="#">Курсы</Link>

      </div>
    </div>
  );
};

export default AnimateSelect;
