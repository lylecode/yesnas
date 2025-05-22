import { BsHddRack } from "react-icons/bs";
import { GrVirtualMachine } from "react-icons/gr";
import { IoLogoDocker } from "react-icons/io5";
import { LuDatabase } from "react-icons/lu";
import { TfiFiles } from "react-icons/tfi";

export const links = [
  {
    name: "控制台",
    sub: [
      { name: "Docker", href: "/", icon: GrVirtualMachine },
      { name: "Vm", href: "/", icon: IoLogoDocker },
    ],
  },
  {
    name: "数据中心",
    sub: [
      { name: "数据池", href: "/storage", icon: LuDatabase },
      { name: "硬盘", href: "/", icon: BsHddRack },
      { name: "文件", href: "/file", icon: TfiFiles },
    ],
  },
];
