import type { AppProps } from "next/app";
import "@/styles/globals.css";
import "@/styles/СourseSlides.css";
import "@/styles/MySelect.css";

import Layout from "@/components/Layout/Layout";

export default function App({ Component, pageProps }: AppProps | any) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
