import React, { FC } from "react";

import Link from "next/link";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import {
  DesktopOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const items: MenuProps["items"] = [
  {
    label: <Link href="/setting/userCourses">Мои Курсы</Link>,
    icon: <DesktopOutlined />,
    key: "1",
  },

  {
    label: <Link href="/setting/editing">Редактировние</Link>,
    icon: <SettingOutlined />,
    key: "2",
  },

  {
    label: <Link href="/cartList">Корзина</Link>,
    icon: <ShoppingCartOutlined />,
    key: "3",
  },

  {
    label: <Link href="/setting/addition/addingCourse">Добавить курс</Link>,
    icon: <AppstoreOutlined />,
    key: "4",
  },

  {
    label: <Link href="/setting/purchasedUserCourses">Мои купленные курсы</Link>,
    icon: <DesktopOutlined />,
    key: "5",
  },
];

const Aside: FC = () => {
  return <Menu mode="horizontal" items={items} />;
};

export default Aside;
