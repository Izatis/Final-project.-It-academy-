import React, { FC } from "react";

import { Select, SelectProps } from "antd";

const MySelect: FC<SelectProps> = ({ className, defaultValue, options }) => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <Select
      className={className}
      defaultValue={defaultValue}
      options={options}
      onChange={handleChange}
    />
  );
};

export default MySelect;
