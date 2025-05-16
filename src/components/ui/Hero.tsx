"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";



const Hero = () => {
    const isAuthenticated = false;
    return (
    <section className="text-center py-20 space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold text-primary"
      >
        {isAuthenticated ? "Welcome Back to TaskFlow" : "Organize Your Day with TaskFlow"}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-muted-foreground max-w-xl mx-auto text-lg"
      >
        {isAuthenticated
          ? "Jump into your tasks and keep up the productivity!"
          : "A clean, minimal, and powerful way to manage your daily tasks and stay productive."}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex justify-center gap-4"
      >
        {isAuthenticated ? (
          <Link href="/profile">
            <Button size="lg">Go to Dashboard</Button>
          </Link>
        ) : (
          <>
            <Link href="/signup">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/signin">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </>
        )}
      </motion.div>
    </section>
  );
};

export default Hero;