import React from "react"

import {PropsDefault} from "@/shared/lib"

import styles from './EventHeader.module.scss'
import {clsx} from "clsx";
import {TextSkeleton} from "@/shared/ui/TextSkeleton";

export const EventHeaderSkeleton: React.FC<PropsDefault> = ({
    className
}) => {
    return (
        <div
            className={clsx(
                className,
                styles.root,
            )}
        >
            <div className={styles.header}>
                <div className={styles.badges}>
                    <div
                        className={clsx(
                            styles.badge,
                            styles[`badge_skeleton`]
                        )}
                    />
                    <div
                        className={clsx(
                            styles.badge,
                            styles[`badge_skeleton`]
                        )}
                    />
                </div>
            </div>
            <TextSkeleton
                className={styles.name}
                view={'secondary'}
                fontSize={20}
                lineHeight={25}
                widthRange={[0.5, 0.7]}
            />
            <TextSkeleton
                className={styles.name}
                view={'secondary'}
                fontSize={11}
                lineHeight={11}
                widthRange={[0.3, 0.7]}
            />
        </div>
    )
}