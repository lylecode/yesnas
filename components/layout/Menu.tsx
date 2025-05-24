import { links } from "@/constants/navMenu";
import Link from "next/link";
import { RxDashboard } from "react-icons/rx";

const Menu = () => {
  return (
    <nav className="flex h-full flex-col border-gray-100">
      <div className="flex flex-1 flex-col gap-6 px-7 py-8">
        <Link
          href="/"
          className="ml-[-6] flex items-center gap-2 rounded-md border-black p-2 pl-2 text-neutral-600 hover:bg-indigo-50 hover:text-neutral-950"
        >
          <RxDashboard className="h-5 w-5 flex-shrink-0 text-neutral-400" />
          <span>Dashboard</span>
        </Link>

        {links.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-5 w-full">
            <h3 className="mb-3 text-sm font-normal tracking-wider text-neutral-500 uppercase">
              {group.name}
            </h3>

            <ul className="flex flex-col gap-1">
              {group.sub.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <li key={itemIndex}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 rounded-md border-black p-2 px-2 text-neutral-800 hover:bg-neutral-200 hover:text-neutral-900"
                    >
                      <Icon className="h-5 w-5 flex-shrink-0 text-neutral-400" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Menu;
