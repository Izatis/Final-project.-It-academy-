import type { AppProps } from "next/app";
import "@/styles/globals.css";
import "@/styles/СourseSlides.css";
import "@/styles/СardSlides.css";
import "@/styles/mySelect.css";
import "@/styles/courseMore.css";
import "@/styles/404.css";

import { Provider } from "react-redux";
import store from "@/redux/store";

import Layout from "@/components/Layout/Layout";
import { Suspense, useEffect, useState } from "react";
// import SignIn from "./auth/signIn/signIn";
// import SignUp from "./auth/signUp/signUp";

export default function App({ Component, pageProps }: AppProps | any) {
  // const [isToken, setIsToken] = useState(null);

  // useEffect(() => {
  //   const parsedToken = JSON.parse(localStorage.getItem("token") as string);
  //   setIsToken(parsedToken);
  // }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </Suspense>
  );
}
