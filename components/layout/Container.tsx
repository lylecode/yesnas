import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Container = ({ title, children, className }: Props) => {
  return (
    <div className={cn("h-full w-full p-6", className)}>
      <h2 className="">{title}</h2>
      <div>{children}</div>{" "}
    </div>
  );
};

export default Container;
