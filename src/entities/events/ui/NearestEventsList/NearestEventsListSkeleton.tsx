import React from "react"

import {EventCardSkeleton} from "src/entities/events/ui/EventCard"

import {tsToDayName, tsToWordOrFormatted} from "@/shared/lib/date.ts"
import {PropsDefault, TimeStamp} from "@/shared/lib"

import styles from './NearestEventsList.module.scss'

export const NearestEventsListSkeleton: React.FC<PropsDefault<{
    date: TimeStamp
}>> = ({
    className,
    date,
}) => (
    <div className={className}>
        <div className={styles.header}>
            <p className={styles['day-word']}>{tsToWordOrFormatted(date)}</p>
            <p className={styles['day-name']}>{tsToDayName(date)}</p>
        </div>
        <div className={styles.list}>
            {Array(3).fill(1).map((_, key) => (
                <EventCardSkeleton
                    key={key}
                />
            ))}
        </div>
    </div>
)