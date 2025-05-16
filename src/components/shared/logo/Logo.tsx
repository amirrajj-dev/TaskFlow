"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircleIcon, ListTodo } from "lucide-react";
const Logo = () => {
  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-2 text-primary items-center justify-center"
    >
      <div className="flex items-center gap-2">
        <motion.div whileHover={{ rotate: 5 }}>
          <ListTodo className="w-6 h-6" />
        </motion.div>

        <CheckCircleIcon className="w-6 h-6 text-green-500" />
      </div>
      <h2 className="text-3xl font-bold">TaskFlow</h2>
    </motion.div>
  );
};

export default Logo;
