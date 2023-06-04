import React, { ChangeEvent, FC } from "react";
import s from "./CartItem.module.scss";

import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";

import Rating from "../Rating/Rating";
import { ICart } from "@/redux/types/cart";
import { useRemoveFromCartMutation } from "@/redux/reducers/cart";

interface ICartProps {
  cart: ICart;
}

const CartItem: FC<ICartProps> = ({ cart }) => {
  const [removeFromCart] = useRemoveFromCartMutation();

  const handleClick = async (event: ChangeEvent<HTMLInputElement>, courseId: number) => {
    console.log(event);
    console.log(courseId);
    
    event.preventDefault();
    await removeFromCart(courseId).unwrap();
  };
  return (
    <Link className={s.cart__link} href={`/courseMore/${cart.id}`}>
      <div className={s.cart__image}>
        <Image
          src={
            "https://img.freepik.com/premium-photo/word-design-written-top-colorful-geometric-3d-shapes_2227-1663.jpg"
          }
          alt="poster"
          width={300}
          height={200}
        />

        <div className={s.blackout}>
          <span>Нажмите</span>
        </div>
      </div>

      <div className={s.cart__info}>
        <ul className={s.content__list}>
          <li className={s.cart__title}>{cart.name}</li>
          <li className={s.cart__creator}>Автор: {cart.author}</li>
          <li className={s.cart__rating} onClick={(e) => e.preventDefault()}>
            <pre>{cart.price}</pre>
            <Rating value={2.5} />
          </li>
          <li className={s.cart__duration}>{cart.created}</li>
          <li className={s.cart__duration}>{cart.language}</li>
        </ul>

        <span className={s.cart__price}>{cart.price} $</span>

        <div className={s.cart__buttons}>
          <FontAwesomeIcon
            className={s.cart__heart}
            icon={faHeart}
            onClick={(e) => e.preventDefault()}
          />

          <FontAwesomeIcon
            className={s.cart__trash}
            icon={faTrash}
            onClick={(e) => handleClick}
          />
        </div>
      </div>
    </Link>
  );
};

export default CartItem;
