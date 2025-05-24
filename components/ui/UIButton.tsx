import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@heroui/react";

const UIButton = ({
  children = "确认",
  className,
  ...restProps
}: ButtonProps) => {
  return (
    <Button
      color="primary"
      className={cn("border-1", className)}
      radius="lg"
      {...restProps}
    >
      {children}
    </Button>
  );
};

export default UIButton;
