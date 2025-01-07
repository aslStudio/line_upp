import React, {useMemo} from "react"
import {clsx} from "clsx"

import {CalendarEvent} from "@/entities/events/model"
import {
    getHiddenParticipantsAvatars,
    getParticipantsAvatar,
    getParticipantsNames
} from "@/entities/events/lib"

import {PropsDefault, RootPaths} from "@/shared/lib"
import {EventType, OrderStatus} from "@/shared/api/enum.ts"
import {Icon, IconProps} from "@/shared/ui/Icon"
import {getTimeRange} from "@/shared/lib/date.ts"
import {useProjectNavigate} from "@/shared/lib/hooks"

import styles from './EventCard.module.scss'
import {FavoriteButton} from "@/features/events/ui";
import {Link} from "react-router-dom";

export type NearestEventCardProps = PropsDefault<{
    event: CalendarEvent['events'][number]
}>

export const EventCard: React.FC<NearestEventCardProps> = ({
    className,
    event,
}) => {
    const { getPath } = useProjectNavigate()

    const state = useMemo<{
        text: string
        icon: IconProps['name'] | null
        view: 'green' | 'gray' | 'blue' | 'orange' | 'red'
    }>(() => {
        if (event.eventType === EventType.CLOSED) {
            return {
                text: 'Закрытое событие',
                icon: 'lock',
                view: 'gray',
            }
        }

        if (event.eventType === EventType.PERSONAL) {
            return {
                text: 'Личное событие',
                icon: null,
                view: 'blue',
            }
        }

        if (event.orderType === OrderStatus.PROCESSING) {
            return {
                text: 'Заявка на рассмотрении',
                icon: null,
                view: 'gray',
            }
        }

        if (event.orderType === OrderStatus.APPROVED) {
            return {
                text: 'Вы участник',
                icon: null,
                view: 'green',
            }
        }

        if (event.orderType === OrderStatus.INVITED) {
            return {
                text: 'Вы приглашены',
                icon: null,
                view: 'green',
            }
        }

        if (event.orderType === OrderStatus.REJECTED) {
            return {
                text: 'Заявка отклонена',
                icon: null,
                view: 'red',
            }
        }

        if (
            event.orderType === OrderStatus.SUBMIT_PARTICIPANT ||
            event.orderType === OrderStatus.APPROVED_SUBMIT_PARTICIPANT
        ) {
            return {
                text: 'Подтвердите участие',
                icon: null,
                view: 'orange',
            }
        }

        return {
            text: 'Есть заявки',
            icon: null,
            view: 'green',
        }
    }, [event])

    return (
        <div
            className={clsx(
                className,
                styles.root,
            )}
        >
            <Link
                className={styles.link}
                to={getPath(RootPaths.EVENTS, event.id)}
            />
            <div className={clsx(
                styles.state,
                styles[`state_${state.view}`]
            )}>
                <p>{state.text}</p>
                {state.icon && (
                    <Icon
                        name={state.icon}
                        size={16}
                        view={'gray'}
                    />
                )}
            </div>
            <div
                style={{
                    borderLeftColor: event.color,
                }}
                className={styles.content}
            >
                <div className={styles.header}>
                    <div className={clsx(
                        styles['time-range'],
                        {
                            [styles['is-owl']]: event.isOwl,
                        }
                    )}>
                        <p>
                            {getTimeRange(
                                event.startTime,
                                event.endTime,
                            )}
                        </p>
                        {event.isOwl && (
                            <Icon
                                name={'owl'}
                                view={'red'}
                                size={16}
                            />
                        )}
                    </div>
                    <FavoriteButton
                        event={event}
                        size={24}
                    />
                </div>
                <div className={styles.wrapper}>
                    <p
                        style={{
                            color: event.color
                        }}
                        className={styles.project}
                    >
                        {event.project}
                    </p>
                    {event.group && (
                        <>
                            <span
                                style={{
                                    backgroundColor: event.color,
                                }}
                            />
                            <p
                                style={{
                                    color: event.color
                                }}
                                className={styles.group}
                            >
                                {event.group}
                            </p>
                        </>
                    )}
                </div>
                <p className={styles.name}>{event.name}</p>
                <div className={styles.participants}>
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
                    <p>{getParticipantsNames(event.participants)}</p>
                </div>
                {event.price && (
                    <div className={styles.price}>
                        <p className={styles['price-label']}>Оплата</p>
                        <p className={styles['price-value']}>{event.price}</p>
                    </div>
                )}
            </div>
            <div className={styles.buttons}>
                <button>Заметка</button>
                <button>К проекту</button>
            </div>
        </div>
    )
}