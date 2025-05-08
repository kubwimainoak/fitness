import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Search, Calendar, UserCircle } from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

export function BottomNavigation() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      title: "Home",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Gyms",
      href: "/dashboard/gyms",
      icon: <Search className="h-5 w-5" />,
    },
    {
      title: "Classes",
      href: "/dashboard/classes",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: <UserCircle className="h-5 w-5" />,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center justify-center w-full h-full"
          >
            <div
              className={`flex flex-col items-center justify-center ${
                pathname === item.href
                  ? "text-[#1E3A8A]"
                  : "text-gray-500"
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 