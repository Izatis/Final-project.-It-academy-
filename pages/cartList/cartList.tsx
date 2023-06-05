import React, { useEffect, useState } from "react";
import s from "./cartList.module.scss";

import Link from "next/link";
import {
  useReceivingABasketQuery,
  useBasketAmountQuery,
} from "@/redux/reducers/cart";
import { ICart } from "@/redux/types/cart";

import MyButton from "@/UI/Buttons/MyButton/MyButton";
import CartItem from "@/components/CartItem/CartItem";
import Loading from "@/components/Loading/Loading";

const CartList = () => {
  const [token, setToken] = useState("");
  const { data: carts = [], isLoading } = useReceivingABasketQuery({ token });
  const { data: basketAmount = 0 } = useBasketAmountQuery({ token });

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
              <span className={s.aside__price}>{basketAmount} $</span>

              <Link href="/paymentPages/payment/payment">
                <MyButton className={s.aside__Button}>Купить сейчас</MyButton>
              </Link>
            </aside>

            <div className={s.cart__rightBlock}>
              {Array.isArray(carts) ? (
                carts.map((cart: ICart) => {
                  return (
                    <CartItem cart={cart} key={cart.id}/>
                  );
                })
              ) : (
                <b className={s.cart__isEmpty}>Корзина пуста</b>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CartList;
