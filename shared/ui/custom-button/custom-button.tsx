import { FC, memo } from "react";

import { useFormikContext } from "formik";
import { Button } from "antd";
import { ButtonProps } from "antd/lib/button";

const CustomButton: FC<ButtonProps> = memo(({ children, ...props }) => {
  const { isValid, resetForm } = useFormikContext();

  const handleSubmit = async () => {
    setTimeout(() => {
      resetForm();
    }, 700);
  };

  const configButton = {
    ...props,
    type: props.type || "primary",
    onClick: handleSubmit,
    htmlType: props.htmlType || "submit",
    disabled: !isValid,
  };

  return <Button {...configButton}>{children}</Button>;
});

export default CustomButton;
