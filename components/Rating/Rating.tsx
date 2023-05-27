import React, { FC } from "react";

import { Rate } from "antd";

interface IRatingProps {
  value: number;
}

const Rating: FC<IRatingProps> = ({ value }) => (
  <Rate allowHalf defaultValue={value} />
);

export default Rating;
