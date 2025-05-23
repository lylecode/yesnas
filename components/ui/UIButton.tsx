import { Button, ButtonProps } from "@heroui/react";

const UIButton = ({ children = "确认", ...restProps }: ButtonProps) => {
  return (
    <Button color="primary" radius="lg" {...restProps}>
      {children}
    </Button>
  );
};

export default UIButton;
