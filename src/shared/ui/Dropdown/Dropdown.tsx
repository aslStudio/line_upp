import React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { clsx } from "clsx";

import { PropsDefaultWithChildren } from "@/shared/lib";

import styles from "./Dropdown.module.scss";

export const Dropdown: React.FC<
    PropsDefaultWithChildren<{
        parentRef: React.RefObject<HTMLElement>;
        offset: {
            top: number;
            right: number;
        };
        isOpen: boolean;
        setIsOpen?: (isOpen: boolean) => void;
    }>
> = ({ className, parentRef, offset, isOpen, children }) => {
    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={clsx(className, styles.tooltip)}
                    style={{
                        top: `${
                            (parentRef.current?.offsetTop ?? 0) +
                            (parentRef.current?.clientHeight ?? 0) +
                            offset.top
                        }px`,
                        right: `${
                            window.innerWidth -
                            (parentRef.current?.offsetLeft ?? 0) -
                            (parentRef.current?.clientWidth ?? 0) +
                            offset.right
                        }px`,
                    }}
                    initial={{
                        opacity: 0,
                        y: 100,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    exit={{
                        opacity: 0,
                        y: 100,
                    }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};
