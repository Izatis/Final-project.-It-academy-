import React, { FC } from "react";

import { Input, InputProps } from "antd";

const MyInput: FC<InputProps> = ({ className, size, prefix, placeholder, onChange }) => {
  return <Input className={className} size={size} prefix={prefix} placeholder={placeholder} onChange={onChange}/>;
};

export default MyInput;
// 