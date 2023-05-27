import React, { FC, useEffect, useState } from "react";
import s from "./search.module.scss";

import { useRouter } from "next/router";
import { Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import en from "../../locales/EN/translation.json";
import ru from "../../locales/RU/translation.json";
import MyInput from "@/components/MUI/MyInput/MyInput";

interface ISearch {
  search: string;
}

const Search: FC = () => {
  // Состояния - для данных пользователя регистрации
  const [search, setSearch] = useState<ISearch>({
    search: "",
  });

  // Для - маршутизации
  const { push, locale } = useRouter();

  // Функции - для смены текста
  const t = locale === "ru" ? ru : en;

  // Функции - для поиска
  const handleSearch = async (value: ISearch) => {};

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...search });
  }, []);

  return (
    <section className={s.search}>
      <h2>{t.search[0]}</h2>

      <Form form={form} name="sign-in-form" onFinish={handleSearch}>
        <Form.Item
          name="search"
          rules={[
            {
              required: true,
              message: t.search[2],
            },
          ]}
        >
          <MyInput className={s.search__input} prefix={<SearchOutlined />} placeholder={t.search[1]} />
        </Form.Item>
      </Form>
    </section>
  );
};

export default Search;
