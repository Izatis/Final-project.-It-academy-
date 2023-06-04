import React, { useEffect, useState } from "react";
import s from "./cartList.module.scss";

import Link from "next/link";
import { useReceivingABasketQuery } from "@/redux/reducers/cart";
import { ICart } from "@/redux/types/cart";

import MyButton from "@/UI/Buttons/MyButton/MyButton";
import CartItem from "@/components/CartItem/CartItem";
import Loading from "@/components/Loading/Loading";

const CartList = () => {
  const [token, setToken] = useState("");
  const { data: carts = [], isLoading } = useReceivingABasketQuery({ token });

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className={s.cart}>
          <h2>Корзина</h2>

          <div className={s.cart__content}>
            <aside>
              <span className={s.aside__total}>Итого:</span>
              <span className={s.aside__price}>5099$</span>

              <Link href="/payment/payment">
                <MyButton className={s.aside__Button}>Купить сейчас</MyButton>
              </Link>
            </aside>
            <div className={s.cart__rightBlock}>
              {carts.map((cart: ICart) => {
                return <CartItem cart={cart} key={cart.id} />;
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CartList;
