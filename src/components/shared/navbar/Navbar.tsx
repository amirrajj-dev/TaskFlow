"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, LogIn, LogOut, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/shared/theme/ModeToggle";
import Logo from "@/components/shared/logo/Logo";
import { useAuthStore } from "@/store/auth.store";
import { logout } from "@/actions/auth.action";
import { toast } from "sonner";

const Navbar = () => {
  const { user, isLoggedIn, clearUser } = useAuthStore()
  const handleLogout = async () => {
    await logout()
    toast.success("Logged out successfully" , {
      style : {
        backgroundColor : "#00bc7d"
      }
    })
    clearUser()
  }
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Logo />
          </motion.div>
        </Link>

        {/* Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          {isLoggedIn ? (
            <>
              <Link href="/profile">
                <Button variant="outline" size="sm" className="cursor-pointer">
                  <UserCircle className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="cursor-pointer" onClick={()=>handleLogout()}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button variant="outline" size="sm" className="cursor-pointer">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="cursor-pointer">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle menu"
                aria-expanded="false"
                className="cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[80vw] sm:w-72 p-6 space-y-6"
            >
              <Logo/>
              <div className="pt-6 space-y-4">
                {isLoggedIn ? (
                  <div className="flex flex-col  gap-4 p-1">
                    <Link href={"/profile"}>
                      <Button
                        variant="outline"
                        className="w-full cursor-pointer"
                      >
                        <UserCircle className="w-4 h-4 mr-2" />
                        Profile
                      </Button>
                    </Link>
                    <Button variant="ghost" className="w-full cursor-pointer">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col  gap-4 p-1">
                    <Link href="/signin">
                      <Button variant="outline" className="w-full">
                        <LogIn className="w-4 h-4 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
