"use client";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { FC } from "react";

const FormError: FC<{message: string}> = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 rounded-md px-3 py-2 mt-1"
    >
      <AlertTriangle className="w-4 h-4" />
      <span>{message}</span>
    </motion.div>
  );
};

export default FormError;