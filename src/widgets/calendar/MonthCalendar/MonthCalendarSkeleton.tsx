import React from "react"
import {clsx} from "clsx"

import {PropsDefault} from "@/shared/lib"
import {SkeletonWrapper} from "@/shared/ui/SkeletonWrapper"
import {TextSkeleton} from "@/shared/ui/TextSkeleton"

import styles from './MonthCalendar.module.scss'

export const MonthCalendarSkeleton: React.FC<PropsDefault> = ({
    className
}) => {
    const daysNames = [
        'пн',
        'вт',
        'ср',
        'чт',
        'пт',
        'сб',
        'вс',
    ]

    return (
        <SkeletonWrapper
            className={clsx(
                className,
                styles.root,
            )}
        >
            <div className={styles.header}>
                {daysNames.map(item => (
                    <div key={item} className={styles['header-item']}>
                        {item}
                    </div>
                ))}
            </div>
            <div className={styles.body}>
                {Array(30).map((_, key) => (
                    <div
                        key={key}
                        className={styles['body-item']}
                    >
                        <TextSkeleton
                            key={key}
                            fontSize={17}
                            lineHeight={22}
                            widthRange={[0.5, 0.7]}
                            view={'secondary'}
                        />
                    </div>
                ))}
            </div>
        </SkeletonWrapper>
    )
}