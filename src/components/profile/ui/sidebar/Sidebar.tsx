"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, LayoutDashboard, Settings, ListTodo } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/shared/theme/ModeToggle";
import Logo from "@/components/shared/logo/Logo";
import { motion } from "framer-motion";

const navItems = [
  { href: "/profile/overview", label: "Overview", icon: LayoutDashboard },
  { href: "/profile/tasks", label: "Tasks", icon: ListTodo },
  { href: "/profile/settings", label: "Settings", icon: Settings },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const SidebarContent = ({
    onNavItemClick,
  }: {
    onNavItemClick?: () => void;
  }) => (
    <div className="flex flex-col h-full space-y-6 fixed">
      <div className="flex items-center justify-between">
        <Link href={"/"} className="flex-1">
          <Logo />
        </Link>
        <ModeToggle />
      </div>

      <div className="text-sm font-medium text-muted-foreground px-1">
        My Profile
      </div>

      <nav className="flex flex-col gap-2 relative">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              onClick={() => {
                if (onNavItemClick) onNavItemClick();
              }}
              className={cn(
                "relative flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-accent-foreground",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-highlight"
                  className="absolute inset-0 bg-accent rounded-md z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <Icon className="w-4 h-4 z-10" />
              <span className="z-10">{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      <aside className="hidden md:flex md:flex-col w-70 lg:w-80 bg-muted border-r p-6">
        <SidebarContent />
      </aside>

      {/* Sidebar - Mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              onClick={() => setIsSheetOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-6 bg-muted">
            <SidebarContent onNavItemClick={() => setIsSheetOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Sidebar;
