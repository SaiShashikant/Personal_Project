"use client";
import React, {useState} from "react";
import {AnimatePresence, motion, useMotionValueEvent, useScroll,} from "framer-motion";
import Link from "next/link";
import {cn} from "@/app/lib/utils";

export const FloatingNav = ({
                                navItems,
                                className,
                            }: {
    navItems: {
        name: string;
        link: string;
        icon?: React.ReactElement;
        download?: string;
    }[];
    className?: string;
}) => {
    const { scrollYProgress } = useScroll();

    const [visible, setVisible] = useState(false);

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        // Check if current is not undefined and is a number
        if (typeof current === "number") {
            let direction = current! - scrollYProgress.getPrevious()!;

            if (scrollYProgress.get() < 0.05) {
                setVisible(false);
            } else {
                if (direction < 0) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            }
        }
    });

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 1,
                    y: -100,
                }}
                animate={{
                    y: visible ? 0 : -100,
                    opacity: visible ? 1 : 0,
                }}
                transition={{
                    duration: 0.2,
                }}
                className={cn(
                    "flex max-w-[calc(100vw-1.5rem)] sm:max-w-fit fixed top-4 sm:top-10 inset-x-0 mx-auto border bg-black-100 dark:border-white/[0.2] rounded-2xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-3 py-3 sm:px-8 sm:py-5 items-center justify-center gap-x-3 gap-y-1 sm:gap-4 flex-wrap border-white/[0.2]",
                    className
                )}
            >
                {navItems.map((navItem, idx: number) => {
                    const className = cn(
                        "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
                    );
                    const label = (
                        <>
                            <span className="block sm:hidden">{navItem.icon}</span>
                            <span className="text-xs sm:text-sm whitespace-nowrap !cursor-pointer">{navItem.name}</span>
                        </>
                    );
                    if (navItem.download) {
                        return (
                            <a key={`link=${idx}`} href={navItem.link} download={navItem.download} className={className}>
                                {label}
                            </a>
                        );
                    }
                    return (
                        <Link key={`link=${idx}`} href={navItem.link} className={className}>
                            {label}
                        </Link>
                    );
                })}
            </motion.div>
        </AnimatePresence>
    );
};
