import React, { FC } from "react";
// import s from "./errorPage.module.scss";

import Link from "next/link";
import MyButton from "@/UI/Buttons/MyButton/MyButton";

const ErrorPage: FC = () => {
  return (
    <section className="errorPage">
      <div className="errorPage__content">
        <h2>404 - Page Not Found</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link href="/">
          <MyButton className="adminPage__button" type="primary">
            Go back to home
          </MyButton>
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
