import React, {useEffect, useLayoutEffect, useMemo} from "react"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {nearestListModel} from "@/entities/events/model"

import {BottomSheet} from "@/shared/ui/BottomSheet"
import {Icon} from "@/shared/ui/Icon"

import {TransitionFade} from "@/shared/ui/TransitionFade"
import {NearestEventsList, NearestEventsListSkeleton} from "@/entities/events/ui"
import {TextSkeleton} from "@/shared/ui/TextSkeleton"
import {formatTime, getTimeUntil, getToday, getTomorrow, toTime} from "@/shared/lib/date.ts"

import styles from './NearestEventsModal.module.scss'
import {useProjectNavigate, useTimer} from "@/shared/lib/hooks";
import {CreateEventPaths, EventsPaths, RootPaths} from "@/shared/lib";
import {createEventsModel} from "@/features/events/model";
import {useScreen} from "@/shared/lib/providers/ScreenProvider";

export const NearestEventsModal: React.FC = () => {
    const {
        isPending,
    } = useSelector((state: RootState) => state.nearestList)
    const dispatch = useDispatch<AppDispatch>()

    const { isDesktop } = useScreen()

    useEffect(() => {
        dispatch(nearestListModel.thunks.fetchNearestThunk())
    }, [])

    useLayoutEffect(() => {
        document.addEventListener('focusin', e => e.stopImmediatePropagation());
        document.addEventListener('focusout', e => e.stopImmediatePropagation());
    }, []);

    return (
        <BottomSheet
            isOpen={true}
            isDefaultOpen={true}
            isDismissible={false}
            isModal={false}
            isUnderTabBar={true}
            snapPoints={
                isDesktop
                    ? [
                        '140px',
                        '472px',
                    ]
                    : [
                        '155px',
                        0.95
                    ]
            }
            HeaderComponent={(
                <Header />
            )}
            setIsOpen={() => {}}
        >
            <TransitionFade className={styles.root}>
                {isPending && (
                    <Skeleton
                        key={'Skeleton'}
                    />
                )}
                {!isPending && (
                    <Content
                        key={'Content'}
                    />
                )}
            </TransitionFade>
        </BottomSheet>
    )
}

const Header = () => {
    const {
        navigate
    } = useProjectNavigate()

    const {
        data,
        isPending,
    } = useSelector((state: RootState) => state.nearestList)
    const dispatch = useDispatch<AppDispatch>()

    const {timer, initTimer} = useTimer()
    const { isDesktop } = useScreen()

    const nearestStartTime = useMemo(() => {
        if (data[0]) {
            if (data[0].events[0]) {
                return data[0].events[0].startTime
            }

            if (data[1].events[0]) {
                return data[1].events[0].startTime
            }

            return null
        }

        return null
    }, [data])

    const timerView = useMemo(() => {
        const { days, hours, minutes } = toTime(timer)

        if (days) {
            return `${days} д ${hours} ч ${minutes} мин`
        }

        if (hours) {
            return `${hours} ч ${minutes} мин`
        }

        return `${minutes} мин`
    }, [timer])

    useEffect(() => {
        if (nearestStartTime) {
            initTimer(getTimeUntil(nearestStartTime))
        }
    }, [nearestStartTime])

    return (
        <TransitionFade>
            {isPending && (
                <div className={styles.header}>
                    <div>
                        <TextSkeleton
                            fontSize={17}
                            lineHeight={22}
                            view={'base'}
                            widthRange={[0.6, 0.8]}
                        />
                        <TextSkeleton
                            fontSize={17}
                            lineHeight={22}
                            view={'secondary'}
                            widthRange={[0.6, 0.8]}
                        />
                    </div>

                    {isDesktop && (
                        <button className={styles['header-button']}>
                            Новое событие
                        </button>
                    )}
                    {!isDesktop && (
                        <button className={styles['header-button']}>
                            <Icon
                                name={'cross-icon'}
                                view={'brand'}
                                size={20}
                            />
                        </button>
                    )}
                </div>
            )}
            {!isPending && (
                <div className={styles.header}>
                    {nearestStartTime && (
                        <div>
                            <p
                                className={styles['header-label']}
                            >
                                След. событие через
                            </p>
                            <p
                                className={styles['header-value']}
                            >
                                {timerView} → {formatTime(nearestStartTime)}
                            </p>
                        </div>
                    )}
                    {isDesktop && (
                        <button
                            className={styles['header-button']}
                            onClick={() => {
                                dispatch(createEventsModel.actions.reset())
                                navigate(
                                    RootPaths.EVENTS,
                                    EventsPaths.CREATE,
                                    CreateEventPaths.EVENT_TYPE,
                                )
                            }}
                        >
                            Новое событие
                        </button>
                    )}
                    {!isDesktop && (
                        <button
                            className={styles['header-button']}
                            onClick={() => {
                                dispatch(createEventsModel.actions.reset())
                                navigate(
                                    RootPaths.EVENTS,
                                    EventsPaths.CREATE,
                                    CreateEventPaths.EVENT_TYPE,
                                )
                            }}
                        >
                            <Icon
                                name={'cross-icon'}
                                view={'brand'}
                                size={20}
                            />
                        </button>
                    )}
                </div>
            )}
        </TransitionFade>
    )
}

const Content = () => {
    const {
        data,
    } = useSelector((state: RootState) => state.nearestList)

    return (
        <>
            <div className={styles.list}>
                {data.map(item => (
                    <NearestEventsList
                        key={item.date}
                        {...item}
                    />
                ))}
            </div>
        </>
    )
}

const Skeleton = () => {
    const skeletons = [
        getToday(),
        getTomorrow()
    ]

    return (
        <>
            <div className={styles.list}>
                {skeletons.map(item => (
                    <NearestEventsListSkeleton
                        key={item}
                        date={item}
                    />
                ))}
            </div>
        </>
    )
}