import React from "react"
import {clsx} from "clsx"

import {PropsDefault} from "@/shared/lib"
import {TextSkeleton} from "@/shared/ui/TextSkeleton"

import styles from "./EventCard.module.scss"

export const EventCardSkeleton: React.FC<PropsDefault> = ({
    className
}) => {
    return (
        <div className={clsx(
            className,
            styles.root
        )}>
            <div
                className={clsx(
                    styles.state,
                    styles[`state_gray`]
                )}
            >
                <TextSkeleton
                    fontSize={14}
                    lineHeight={14}
                    view={'secondary'}
                    widthRange={[0.4, 0.7]}
                />
            </div>
            <div
                style={{
                    borderLeftColor: 'var(--color-placeholder)'
                }}
                className={styles.content}
            >
                <div className={styles.header}>
                    <TextSkeleton
                        fontSize={14}
                        lineHeight={21}
                        widthRange={[0.3, 0.5]}
                        view={'secondary'}
                    />
                </div>
                <div className={styles.wrapper}>
                    <TextSkeleton
                        fontSize={14}
                        lineHeight={14}
                        view={'secondary'}
                        widthRange={[0.5, 0.7]}
                    />
                </div>
                <TextSkeleton
                    className={styles.name}
                    fontSize={17}
                    lineHeight={22}
                    view={'secondary'}
                    widthRange={[0.5, 0.7]}
                />
            </div>
        </div>
    )
}