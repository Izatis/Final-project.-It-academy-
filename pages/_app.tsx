import type { AppProps } from "next/app";
import "@/styles/globals.css";
import "@/styles/СourseSlides.css";
import "@/styles/mySelect.css";

import { Provider } from "react-redux";
import store from "@/redux/store";

import Layout from "@/components/Layout/Layout";

export default function App({ Component, pageProps }: AppProps | any) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
