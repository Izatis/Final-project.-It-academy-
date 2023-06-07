import React, {  FC, useEffect, useState } from "react";
import s from "./CartItem.module.scss";

import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRemoveFromCartMutation } from "@/redux/reducers/cart";
import { ICart } from "@/redux/types/cart";

import Rating from "../Rating/Rating";
import { useGetReviwsAvgGradeQuery } from "@/redux/reducers/review";

interface ICartProps {
  cartBackend: ICart;
}

const CartItem: FC<ICartProps> = ({ cartBackend }) => {
  const [token, setToken] = useState("");

  const [cart, setCart] = useState<ICart>({
    id: 0,
    name: "",
    description: "",
    created: "",
    price: 0,
    language: "",
    author: "",
    authorId: 0,
    imageName: "",
    imageUrl: "",
    duration: 0,
    grade: 0,
  });

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, []);
  
  // ---------------------------------------------------------------------------------------------------------------------------------
  // GET
  const courseId = cartBackend.id;
  const { data: grade = 0, isLoading: isLoadingGrade } =
    useGetReviwsAvgGradeQuery({ token, courseId });

  useEffect(() => {
      setCart({ ...cartBackend, grade: grade });
  }, [cartBackend, isLoadingGrade]);


  // ---------------------------------------------------------------------------------------------------------------------------------
  // DELETE
  const [removeFromCart] = useRemoveFromCartMutation();
  const handleClick = async (event: any, courseId: number) => {
    event.preventDefault();
    await removeFromCart({ token, courseId }).unwrap();
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
            <pre>{cart.grade}</pre>
            <Rating value={cart.grade} />
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
            onClick={(e) => handleClick(e, cart.id)}
          />
        </div>
      </div>
    </Link>
  );
};

export default CartItem;
