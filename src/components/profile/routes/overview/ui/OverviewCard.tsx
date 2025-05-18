import React, { FC } from "react";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const OverviewCard : FC<{title : string; value : number , color : string}> = ({title , value , color}) => {
  return (
    <motion.div
      className="bg-background border rounded-xl p-4 shadow-sm text-center"
      variants={itemVariants}
    >
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </motion.div>
  );
};

export default OverviewCard;
