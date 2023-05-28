import React, { FC } from "react";

import { Input, InputProps } from "antd";

const MyInput: FC<InputProps> = ({ className, size, prefix, placeholder }) => {
  return <Input className={className} size={size} prefix={prefix} placeholder={placeholder} />;
};

export default MyInput;
// 