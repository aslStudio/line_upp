import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {createEventsModel} from "@/features/events/model"

import {Cell} from "@/shared/ui/Cell"
import {Icon} from "@/shared/ui/Icon"
import {useProjectNavigate} from "@/shared/lib/hooks"
import {InputTime} from "@/shared/ui/fields/InputTime"
import {CreateEventPaths, EventsPaths, RootPaths} from "@/shared/lib"
import {formatTime, getDayFromTS, getDayShortcut, getMonthShortcut} from "@/shared/lib/date.ts"

import {Repeat} from "../Repeat"
import {IsOwl} from "../IsOwl"

import styles from './DateAndTime.module.scss'
import {TransitionFade} from "@/shared/ui/TransitionFade";

export const DateAndTime = () => {
    const {
        navigate
    } = useProjectNavigate()

    const {
        data
    } = useSelector((state: RootState) => state.createEvent)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <div className={styles.root}>
            <p className={styles.title}>Место и время</p>
            <Cell
                className={styles.cell}
                size={'m'}
                title={data.address ? `${data.address.street}, ${data.address.house}` : 'Укажите место здесь'}
                description={data.address ? `${data.address.country}, ${data.address.city}` : 'Местоположение'}
                onClick={() => {
                    navigate(
                        RootPaths.EVENTS,
                        EventsPaths.CREATE,
                        CreateEventPaths.PLACE,
                    )
                }}
            >
                <Icon
                    className={styles.icon}
                    name={'chevron'}
                    size={20}
                    view={'placeholder'}
                />
            </Cell>
            <div className={styles['time-card']}>
                <div
                    className={styles['time-card-row']}
                    onClick={() => {
                        navigate(
                            RootPaths.EVENTS,
                            EventsPaths.CREATE,
                            CreateEventPaths.START_CALENDAR,
                        )
                    }}
                >
                    <p className={styles['time-card-title']}>Начало</p>
                    <div className={styles['time-card-wrapper']}>
                        <TransitionFade>
                            {data.isOwl && (
                                <Icon
                                    name={'owl'}
                                    view={'red'}
                                    size={24}
                                />
                            )}
                        </TransitionFade>
                        <p>{getDayShortcut(data.startDate)}, {getDayFromTS(data.startDate)} {getMonthShortcut(data.startDate)}</p>
                        <p>{formatTime(data.startDate)}</p>
                    </div>
                </div>
                <div className={styles['time-card-row']}>
                    <p className={styles['time-card-title']}>Длительность</p>
                    <InputTime
                        type={'HH h MM m'}
                        value={data.duration}
                        setValue={duration => {
                            dispatch(createEventsModel.actions.update({ duration }))
                        }}
                    />
                </div>
            </div>
            <Repeat />
            <IsOwl />
        </div>
    )
}