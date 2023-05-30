import React, { FC, PropsWithChildren, useState } from "react";

import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import Footer from "../Footer/Footer";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  // Состояние - для меню
  const [sideBarActive, setSideBarActive] = useState<boolean>(false);

  return (
    <>
      <Header sideBarActive={sideBarActive} setSideBarActive={setSideBarActive}/>
      <SideBar sideBarActive={sideBarActive} setSideBarActive={setSideBarActive}/>
      {children}
      <Footer />
    </>
  );
};

export default Layout;
