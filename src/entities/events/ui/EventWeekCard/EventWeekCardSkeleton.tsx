import React from "react"

import {PropsDefault} from "@/shared/lib"

import styles from './EventWeekCard.module.scss'
import {clsx} from "clsx";
import {TextSkeleton} from "@/shared/ui/TextSkeleton";

export const EventWeekCardSkeleton: React.FC<PropsDefault> = ({
    className
}) => {
    return (
        <div
            style={{
                borderLeft: `2px solid var(--color-placeholder)`,
            }}
            className={clsx(
                className,
                styles.root
            )}
        >
            <div>
                <TextSkeleton
                    className={styles.project}
                    view={'secondary'}
                    fontSize={11}
                    lineHeight={11}
                    widthRange={[0.3, 0.7]}
                />
                <TextSkeleton
                    className={styles.group}
                    view={'secondary'}
                    fontSize={11}
                    lineHeight={11}
                    widthRange={[0.3, 0.7]}
                />
                <TextSkeleton
                    className={styles.name}
                    view={'secondary'}
                    fontSize={15}
                    lineHeight={18}
                    widthRange={[0.5, 0.9]}
                />
                <TextSkeleton
                    className={styles.period}
                    view={'secondary'}
                    fontSize={12}
                    lineHeight={16}
                    widthRange={[0.3, 0.7]}
                />
            </div>
        </div>
    )
}