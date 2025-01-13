import React from 'react'
import {motion, PanInfo, useAnimation} from 'framer-motion'

import {PropsDefaultWithChildren} from "@/shared/lib"

import styles from './NotificationCardBase.module.scss'
import {clsx} from "clsx";
import {images} from "@/shared/assets/images";
import {TransitionFade} from "@/shared/ui/TransitionFade";
import {Loader} from "@/shared/ui/Loader";

export type NotificationCardBaseProps = PropsDefaultWithChildren<{
    isArchiving: boolean
    onArchive: () => void
}>

export const NotificationCardBase: React.FC<NotificationCardBaseProps> = ({
    className,
    isArchiving,
    onArchive,
    children,
}) => {
    const controls = useAnimation();

    const handleDragEnd = (_: TouchEvent, info: PanInfo) => {
        const offset = info.offset.x
        const threshold = -90

        if (offset <= threshold) {
            onArchive()
        } else {
            controls.start({ x: 0 })
        }
    }

    return (
        <div
            className={clsx(
                styles.root,
                className,
            )}
        >
            <motion.div
                className={styles.content}
                drag={'x'}
                initial={{ x: 0 }}
                dragConstraints={{ left: -90, right: 0 }}
                animate={controls}
                onDragEnd={handleDragEnd}
            >
                {children}
            </motion.div>
            <TransitionFade className={styles.archive}>
                {isArchiving && (
                    <Loader
                        size={'s'}
                        color={'brand'}
                    />
                )}
                {!isArchiving && (
                    <>
                        <img
                            src={images.Notification.Archive}
                            alt={'archive-icon'}
                        />
                        <p>В архив</p>
                    </>
                )}
            </TransitionFade>
        </div>
    )
}