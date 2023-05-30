import React, { FC, PropsWithChildren, useState } from "react";

import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import Footer from "../Footer/Footer";
import SidePanel from "../SidePanel/SidePanel";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  // Состояние - для меню
  const [sideBarActive, setSideBarActive] = useState<boolean>(false);
  const [sidePanelActive, setSidePanelActive] = useState<boolean>(false);

  return (
    <>
      <Header sideBarActive={sideBarActive} setSideBarActive={setSideBarActive}/>
      <SideBar sideBarActive={sideBarActive} setSideBarActive={setSideBarActive}/>
      <SidePanel sidePanelActive={sidePanelActive} setSidePanelActive={setSidePanelActive}/>
      {children}
      <Footer />
    </>
  );
};

export default Layout;
