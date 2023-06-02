import type { AppProps } from "next/app";
import "@/styles/globals.css";
import "@/styles/СourseSlides.css";
import "@/styles/СardSlides.css";
import "@/styles/mySelect.css";

import { Provider } from "react-redux";
import store from "@/redux/store";

import Layout from "@/components/Layout/Layout";
import { Suspense } from "react";

export default function App({ Component, pageProps }: AppProps | any) {
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
