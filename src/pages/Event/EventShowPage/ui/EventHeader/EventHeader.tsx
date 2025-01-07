import React, {useMemo} from "react"
import {useSelector} from "react-redux"
import {clsx} from "clsx"

import {RootState} from "@/app/store.tsx"

import {FavoriteButton} from "@/features/events/ui"

import {PropsDefault} from "@/shared/lib"
import {EventType, OrderStatus} from "@/shared/api/enum.ts"

import styles from './EventHeader.module.scss'

export const EventHeader: React.FC<PropsDefault> = ({
    className
}) => {
    const {
        event
    } = useSelector((state: RootState) => state.eventExpand);

    const badges = useMemo(() => {
        if (event?.isOrganizer && event?.eventType === EventType.CLOSED) {
            return {
                left: {
                    text: 'Закрытое событие',
                    view: 'gray',
                },
                right: null
            }
        }

        switch (event?.orderStatus) {
            case OrderStatus.THERE_ARE_ORDERS:
                if (event?.isOrganizer) {
                    return {
                        left: {
                            text: 'Есть заявки',
                            view: 'green',
                        },
                        right: null
                    }
                }

                return {
                    left: {
                        text: 'Открыто',
                        view: 'green',
                    },
                    right: null
                }
            case OrderStatus.THERE_NOT_ORDERS:
                if (event?.isOrganizer) {
                    return {
                        left: {
                            text: 'Нет заявок',
                            view: 'gray',
                        },
                        right: null
                    }
                }

                return {
                    left: {
                        text: 'Открыто',
                        view: 'green',
                    },
                    right: null
                }
            case OrderStatus.PROCESSING:
                return {
                    left: {
                        text: 'Заявка на рассмотрении',
                        view: 'gray',
                    },
                    right: null
                }
            case OrderStatus.SUBMIT_PARTICIPANT:
                return {
                    left: {
                        text: 'Заявка принята',
                        view: 'green',
                    },
                    right: {
                        text: 'Подтвердите участие',
                        view: 'orange'
                    }
                }
            case OrderStatus.APPROVED:
                return  {
                    left: {
                        text: 'Вы участник',
                        view: 'green',
                    },
                    right: null
                }
            case OrderStatus.APPROVED_SUBMIT_PARTICIPANT:
                return  {
                    left: {
                        text: 'Вы участник',
                        view: 'green',
                    },
                    right: {
                        text: 'Подтвердите участие',
                        view: 'orange'
                    }
                }
            case OrderStatus.INVITED:
                return  {
                    left: {
                        text: 'Вы приглашены',
                        view: 'green',
                    },
                    right: null
                }
            case OrderStatus.REJECTED:
                return  {
                    left: {
                        text: 'Заявка отклонена',
                        view: 'red',
                    },
                    right: null
                }
            default:
                return {
                    left: {
                        text: 'Открыто',
                        view: 'green',
                    },
                    right: null
                }
        }
    }, [event])

    return (
        <div
            className={clsx(
                className,
                styles.root,
            )}
        >
            <div className={styles.header}>
                <div className={styles.badges}>
                    <div className={clsx(
                        styles.badge,
                        styles[`badge_${badges.left.view}`]
                    )}>
                        {badges.left.text}
                    </div>
                    {badges.right && (
                        <div className={clsx(
                            styles.badge,
                            styles[`badge_${badges.right.view}`]
                        )}>
                            {badges.right.text}
                        </div>
                    )}
                </div>
                {event && (
                    <FavoriteButton
                        event={event}
                        size={24}
                    />
                )}
            </div>
            <h1
                className={styles.name}
            >
                {event?.name}
            </h1>
            <div
                className={styles['project-info']}
            >
                <p>{event?.project.name}</p>
                {event?.subgroup && (
                    <>
                        <span/>
                        <p>{event?.subgroup.name}</p>
                    </>
                )}
            </div>

        </div>
    )
}