import React from "react"
import {clsx} from "clsx"

import { PropsDefault, RootPaths } from "@/shared/lib"

import {CalendarEvent} from "@/entities/events/model"
import {
    getHiddenParticipantsAvatars,
    getParticipantsAvatar,
    getParticipantsNames
} from "@/entities/events/lib"

import {EventType, OrderStatus} from "@/shared/api/enum.ts";
import {getTimeRange} from "@/shared/lib/date.ts"
import {useProjectNavigate} from "@/shared/lib/hooks"

import styles from './EventWeekCard.module.scss'
import {Link} from "react-router-dom";

export type EventWeekCardProps = PropsDefault<{
    event: CalendarEvent['events'][number]
}>

const EventWeekCardComponent: React.FC<EventWeekCardProps> = ({
    className,
    event
}) => {
    const { getPath } = useProjectNavigate()

    function getBadgeView(
        type: EventType,
        status: OrderStatus
    ) {
        if (type === EventType.PERSONAL) {
            return 'blue'
        }

        if (status === OrderStatus.PROCESSING) {
            return 'gray'
        }

        return 'green'
    }

    function getBadgeText(
        type: EventType,
        status: OrderStatus
    ) {
        if (type === EventType.PERSONAL) {
            return 'Личное событие'
        }

        if (status === OrderStatus.PROCESSING) {
            return 'На рассмотрении'
        }

        return 'Есть заявки'
    }

    return (
        <div
            style={{
                borderLeft: `2px solid ${event.color}`
            }}
            className={clsx(
                className,
                styles.root
            )}
        >
            <Link
                className={styles.link}
                to={getPath(RootPaths.EVENTS, event.id)}
            />
            <div>
                <p
                    className={styles.project}
                    style={{
                        color: event.color,
                    }}
                >
                    {event.project}
                </p>
                <p
                    className={styles.group}
                    style={{
                        color: event.color,
                    }}
                >
                    {event.group}
                </p>
                <p className={styles.name}>{event.name}</p>
                <p className={styles.period}>
                    {getTimeRange(
                        event.startTime,
                        event.endTime
                    )}
                </p>
                <div className={styles.avatars}>
                    {getParticipantsAvatar(event.participants).map((item, key) => (
                        <div key={key} className={styles.avatar}>
                            <img
                                src={item.avatar}
                                alt={'avatar'}
                            />
                        </div>
                    ))}
                    {!!getHiddenParticipantsAvatars(event.participants) && (
                        <div className={styles.avatar}>
                            <p>+ {getHiddenParticipantsAvatars(event.participants)}</p>
                        </div>
                    )}
                </div>
                <p className={styles.names}>{getParticipantsNames(event.participants)}</p>
            </div>
            <div
                className={clsx(
                    styles.badge,
                    styles[`badge_${getBadgeView(event.eventType, event.orderType)}`],
                )}
            >
                {getBadgeText(event.eventType, event.orderType)}
            </div>
        </div>
    )
}

export const EventWeekCard = React.memo(EventWeekCardComponent)