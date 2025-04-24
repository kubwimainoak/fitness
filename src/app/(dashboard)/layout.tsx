"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Search, 
  Calendar, 
  CreditCard, 
  UserCircle, 
  Settings, 
  LogOut,
  Menu
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Find Gyms",
      href: "/dashboard/gyms",
      icon: <Search className="h-5 w-5" />,
    },
    {
      title: "Classes",
      href: "/dashboard/classes",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Subscription",
      href: "/dashboard/subscription",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: <UserCircle className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#1E3A8A]/[0.02]">
      {/* Mobile Navigation Toggle */}
      <div className="md:hidden p-4 bg-white border-b flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-bold text-[#1E3A8A]">Universal Gym</h1>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Sidebar Navigation */}
      <div 
        className={`${
          isMobileNavOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-white border-r p-6 space-y-8 transition-all duration-300 ease-in-out shadow-sm`}
      >
        <div className="hidden md:block">
          <div className="py-3 px-4 bg-[#1E3A8A]/[0.05] rounded-lg mb-2">
            <h1 className="text-xl font-bold text-[#1E3A8A]">Universal Gym</h1>
            <p className="text-sm text-gray-500">Membership Dashboard</p>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                pathname === item.href
                  ? "bg-[#1E3A8A]/10 text-[#1E3A8A]"
                  : "text-gray-700 hover:bg-[#1E3A8A]/[0.05]"
              }`}
            >
              <span className={pathname === item.href ? "text-[#1E3A8A]" : "text-gray-500"}>{item.icon}</span>
              <span className="ml-3">{item.title}</span>
            </Link>
          ))}
        </nav>

        <div className="pt-8 border-t border-[#1E3A8A]/[0.1]">
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-start text-gray-700 hover:text-[#8B0000] hover:bg-[#8B0000]/10 transition-all duration-200"
            onClick={() => {/* Handle logout */}}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Log Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 md:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
} 