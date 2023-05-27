import React from "react";
import s from "./basketList.module.scss";

import BasketItem from "@/components/BasketItem/BasketItem";
import MyButton from "@/components/MUI/Buttons/MyButton/MyButton";

interface IBaskets {
  id: number;
  title: string;
  creator: string;
  price: number;
}

const baskets: IBaskets[] = [
  {
    id: 1,
    title: "string",
    creator: "stringstring",
    price: 600,
  },
];

const BasketList = () => {
  return (
    <section className={s.basket}>
      <h2>Корзина</h2>

      <div className={s.basket__content}>
        <aside>
          <span className={s.aside__total}>Итого:</span>
          <span className={s.aside__price}>5099$</span>

          <MyButton className={s.aside__subButton}>Купить сейчас</MyButton>
        </aside>
        <div className={s.basket__rightBlock}>
          {baskets.map((basket) => {
            return <BasketItem basket={basket} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default BasketList;
