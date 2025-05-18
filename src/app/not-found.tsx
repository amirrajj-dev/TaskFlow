"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "@/components/shared/logo/Logo";

const NotFound = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-background text-center p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="mb-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Logo/>
      </motion.div>

      <motion.h1
        className="text-4xl font-bold mb-2 text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .7 }}
      >
        404 – Page Not Found
      </motion.h1>

      <motion.p
        className="text-muted-foreground mb-6 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .8 }}
      >
        Oops! The page you’re looking for doesn’t exist.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Link href="/">
          <Button className="rounded-2xl px-6 py-2 text-base cursor-pointer">
            Go Back Home
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;