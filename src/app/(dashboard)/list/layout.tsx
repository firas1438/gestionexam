import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/admin",
        visible: ["admin"],
      },
      {
        icon: "/subject.png",
        label: "Gestion d'examens",
        href: "/list/exams",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "Gestion des salles",
        href: "/list/salles",
        visible: ["admin"],
      },
      {
        icon: "/student.png",
        label: "Gestion surveillants",
        href: "/list/surveillants",
        visible: ["admin"],
      },
    ],
  },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-4"
        >
          <Image src="/logo.png" alt="logo" width={50} height={50} />
          <span className="hidden lg:block font-semibold mt-1 text-gray-600 text-[14px]">
            Dashboard
          </span>
        </Link>
        {/* Pass menuItems to Menu */}
        <Menu menuItems={menuItems} />
      </div>

      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
