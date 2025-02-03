import React from "react"

import {CalendarEvent} from "@/entities/events/model"
import {EventCard} from "src/entities/events/ui/EventCard"

import {PropsDefault} from "@/shared/lib"
import {tsToDayName, tsToWordOrFormatted} from "@/shared/lib/date.ts"

import styles from './NearestEventsList.module.scss'

export type NearestEventsListProps = PropsDefault<CalendarEvent>

export const NearestEventsList: React.FC<NearestEventsListProps> = ({
    className,
    date,
    events,
}) => (
    <div className={className}>
        <div className={styles.header}>
            <p className={styles['day-word']}>{tsToWordOrFormatted(date)}</p>
            <p className={styles['day-name']}>{tsToDayName(date)}</p>
            <span className={styles.length}>
                    {events.length}
                </span>
        </div>
        <div className={styles.list}>
            {events.map(event => (
                <EventCard
                    className={styles.item}
                    key={event.id}
                    event={event}
                />
            ))}
        </div>
    </div>
)