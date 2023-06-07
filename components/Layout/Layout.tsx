import React, { FC, PropsWithChildren, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { useGetCurrentUserQuery } from "@/redux/reducers/user";

import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import Footer from "../Footer/Footer";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState("");
  // Состояние - для меню
  const [sideBarActive, setSideBarActive] = useState<boolean>(false);
  const { pathname } = useRouter();

  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    setToken(parsedToken);
  }, [pathname]);

  const { data: userCurrent = [] } = useGetCurrentUserQuery({ token });


  return (
    <>
      <Header sideBarActive={sideBarActive} setSideBarActive={setSideBarActive} userCurrent={userCurrent}/>
      <SideBar sideBarActive={sideBarActive} setSideBarActive={setSideBarActive} userCurrent={userCurrent}/>
      {children}
      <Footer />
    </>
  );
};

export default Layout;
