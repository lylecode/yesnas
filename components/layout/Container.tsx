import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: Props) => {
  return <div className={cn("w-full p-8", className)}>{children}</div>;
};

export default Container;
