import React, { FC } from "react";

import Link from "next/link";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import {
  DesktopOutlined,
  SettingOutlined,
  TeamOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const items: MenuProps["items"] = [
  {
    label: <Link href="/userCourses/userCourses">Мои Курсы</Link>,
    icon: <DesktopOutlined />,
    key: "1",
  },

  {
    label: <Link href="/editing/editing">Редактировние</Link>,
    icon: <SettingOutlined />,
    key: "2",
  },

  {
    label: <Link href="/usersList/usersList">Все пользователи</Link>,
    icon: <TeamOutlined />,
    key: "3",
  },

  {
    label: <Link href="/">Добавить курс</Link>,
    icon: <AppstoreOutlined />,
    key: "4",
  },
];

const Aside: FC = () => {
  return <Menu mode="horizontal" items={items} />;
};

export default Aside;
