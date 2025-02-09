import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type MenuItem = {
  title: string;
  items: {
    icon: string;
    label: string;
    href: string;
  }[];
};

type MenuProps = {
  menuItems: MenuItem[]; // Only the dynamic part (MENU)
};

const otherMenu: MenuItem = {
  title: "AUTRE",
  items: [
    {
      icon: "/profile.png",
      label: "Profile",
      href: "/profile",
    },
    {
      icon: "/setting.png",
      label: "Settings",
      href: "/settings",
    },
    {
      icon: "/logout.png",
      label: "Logout",
      href: "/logout",
    },
  ],
};

const Menu = ({ menuItems }: MenuProps) => {
  const fullMenu = [...menuItems, otherMenu]; // Merge dynamic menu with the common "OTHER" section

  return (
    <div className="mt-4 text-sm">
      {fullMenu.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-1 rounded-md hover:bg-lamaSkyLight"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
