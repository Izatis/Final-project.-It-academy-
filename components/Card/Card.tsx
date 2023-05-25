// import React from "react";
// import s from "./Card.module.scss";

// import Link from "next/link";
// import Image from "next/image";

// const Card = () => {
//   return (
//     <li className={s.card__item} key={card.id}>
//       <Link href={`/courses/${card.id}`} className={s.card__link}>
//         <div className={s.card__content}>
//           <div className={s.card__image}>
//             <Image
//               src={
//                 "https://img.freepik.com/premium-photo/word-design-written-top-colorful-geometric-3d-shapes_2227-1663.jpg"
//               }
//               alt="сard image"
//               width={300}
//               height={200}
//             />

//             <div className={s.blackout}>
//               <span>Нажмите</span>
//             </div>
//           </div>

//           <ul className={s.content__list}>
//             <li>
//               <h3>{card.name}</h3>
//             </li>
//             <li className={s.card__desciption}>{card.description}</li>
//             <li className={s.card__creator}>{card.creator}</li>
//             <li onClick={(e) => e.preventDefault()}>
//               <pre>{card.price} </pre>
//               <Rating value={2.5} />
//             </li>
//             <li className={s.card__duration}>{card.price}</li>
//           </ul>
//         </div>

//         <span className={s.card__price}>{card.price} $</span>
//       </Link>
//     </li>
//   );
// };

// export default Card;
