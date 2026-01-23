import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

export const DraggableCardContainer = ({ children, className }) => {
  return (
    <div className={twMerge("relative h-full w-full", className)}>
      {children}
    </div>
  );
};

export const DraggableCardBody = ({ children, className }) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
      whileDrag={{ scale: 1.05, zIndex: 50 }}
      className={twMerge("cursor-grab active:cursor-grabbing", className)}
    >
      {children}
    </motion.div>
  );
};