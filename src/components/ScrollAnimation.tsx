"use client";

import { motion } from "framer-motion";
import React from "react";

interface ScrollAnimationProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export default function ScrollAnimation({
    children,
    className,
    delay = 0,
}: ScrollAnimationProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                type: "spring",
                damping: 20,
                stiffness: 100,
                delay: delay,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
