import React from "react";
import { createPortal } from "react-dom";
import styles from "./ModalDesktopWrapper.module.scss";
import { Icon } from "../Icon";
import { AnimatePresence, motion } from "framer-motion";
import { PropsDefault } from "@/shared/lib";
import clsx from "clsx";

export type DesktopModalProps = PropsDefault<{
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}>;

export const ModalDesktopWrapper: React.FC<DesktopModalProps> = ({
    isOpen,
    onClose,
    className,
    children,
}) => {
    if (!isOpen) return null;

    return createPortal(
        <AnimatePresence>
            <motion.div
                className={styles.overlay}
                onClick={onClose}
                initial={{
                    opacity: 0,
                    y: -50,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                exit={{
                    opacity: 0,
                    y: -50,
                }}
            >
                <div
                    className={clsx(styles.modal, className)}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className={styles.closeButton} onClick={onClose}>
                        <Icon
                            name={"cross-icon"}
                            view={"placeholder"}
                            size={20}
                        />
                    </button>
                    {children}
                </div>
            </motion.div>
        </AnimatePresence>,

        document.body
    );
};
