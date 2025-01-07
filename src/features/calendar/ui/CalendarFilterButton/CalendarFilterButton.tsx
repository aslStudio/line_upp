import React, {useCallback, useEffect, useMemo, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {clsx} from "clsx"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {eventsFiltersModel} from "@/features/events/model"

import {Color} from "@/entities/color/model"
import {ColorSelect} from "@/entities/color/ui"
import {ProjectSelect} from "@/entities/projects/ui"
import {Project, SubGroup} from "@/entities/projects/model"
import {Schedule} from "@/entities/schedule/model"
import {ScheduleSelect} from "@/entities/schedule/ui"
import {EventTypeCheckList} from "@/entities/events/ui"
import {OrderStatusCheckList} from "@/entities/events/ui/OrderStatusCheckList"

import {BottomSheet, useModal} from "@/shared/ui/BottomSheet"
import {Icon} from "@/shared/ui/Icon"
import {Button} from "@/shared/ui/Button"
import {TransitionFade} from "@/shared/ui/TransitionFade"
import {Collapse} from "@/shared/ui/Collapse"
import {Loader} from "@/shared/ui/Loader"
import {EventType, OrderStatus} from "@/shared/api/enum.ts"

import styles from './CalendarFilterButton.module.scss'

export const CalendarFilterButton: React.FC = () => {
    const { filters } = useSelector((state: RootState) => state.eventsFilters)
    const { state } = useSelector((state: RootState) => state.viewer)

    const { isOpen, open, close } = useModal()

    const isFiltered = useMemo(() => {
        return Object.values(filters).reduce((prev, curr) => {
            if (Array.isArray(curr)) {
                return prev || !!curr.length
            }

            return prev || !!curr
        }, false)
    }, [filters])

    return (
        <>
            <button
                className={clsx(
                    styles.root,
                    {
                        [styles['is-loading']]: state === 'pending',
                    }
                )}
                onClick={open}
            >
                <TransitionFade
                    className={styles.loader}
                >
                    {state === 'pending' && (
                        <Loader
                            color={'white'}
                            size={'s'}
                        />
                    )}
                </TransitionFade>
                <div className={styles.content}>
                    <Icon
                        key={'isFocused'}
                        name={'filter'}
                        view={'placeholder'}
                        size={24}
                    />
                    {isFiltered && (
                        <p>1</p>
                    )}
                </div>
            </button>
            <FiltersModal
                isOpen={isOpen}
                setIsOpen={close}
            />
        </>
    )
}

const FiltersModal: React.FC<{
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}> = ({
    isOpen,
    setIsOpen,
}) => {
    const { filters } = useSelector((state: RootState) => state.eventsFilters)
    const dispatch = useDispatch<AppDispatch>()

    const [color, setColor] = useState<Color[]>([])
    const [project, setProject] = useState<Project[]>([])
    const [subgroup, setSubgroup] = useState<SubGroup[]>([])
    const [schedule, setSchedule] = useState<Schedule[]>([])
    const [eventType, setEventType] = useState<EventType[]>([])
    const [orderStatus, setOrderStatus] = useState<OrderStatus[]>([])

    const isFiltered = useMemo(() => {
        return (
            !!color.length ||
            !!project.length ||
            !!subgroup.length ||
            !!schedule.length ||
            !!eventType.length ||
            !!orderStatus.length
        )
    }, [color.length, eventType.length, orderStatus.length, project.length, schedule.length, subgroup.length])

    const initLocalValuesHandler = useCallback(() => {
        setColor(filters.color)
        setProject(filters.project)
        setSubgroup(filters.subgroup)
        setSchedule(filters.schedule)
        setEventType(filters.eventType)
        setOrderStatus(filters.orderStatus)
    }, [filters])

    const onSubmit = useCallback(() => {
        dispatch(eventsFiltersModel.actions.setFilters({
            color,
            project,
            subgroup,
            schedule,
            eventType,
            orderStatus,
        }))

        setIsOpen(false)
    }, [color, project, subgroup, schedule, eventType])

    const onReset = useCallback(() => {
        dispatch(eventsFiltersModel.actions.resetFilters())
        initLocalValuesHandler()
    }, [])

    useEffect(() => {
        if (isOpen) {
            initLocalValuesHandler()
        }
    }, [isOpen]);

    return (
        <BottomSheet
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <div className={styles.filters}>
                <div className={styles['filters-header']}>
                    <p>Фильтр</p>
                    <div className={styles['close-wrapper']}>
                        <TransitionFade>
                            {isFiltered && (
                                <button
                                    className={styles['reset-button']}
                                    onClick={onReset}
                                >
                                    Сбросить
                                </button>
                            )}
                        </TransitionFade>
                        <button
                            className={styles['close-button']}
                            onClick={() => setIsOpen(false)}
                        >
                            <Icon
                                name={'cross-icon'}
                                view={'placeholder'}
                                size={20}
                            />
                        </button>
                    </div>
                </div>
                <div className={styles.colors}>
                    <p>Цвет</p>
                    <ColorSelect
                        value={color}
                        setValue={setColor}
                    />
                </div>
                <Collapse
                    title={'Проект'}
                    initValue={!!project.length}
                >
                    <ProjectSelect
                        projects={project}
                        setProjects={setProject}
                        subgroups={subgroup}
                        setSubGroups={setSubgroup}
                    />
                </Collapse>
                <Collapse
                    title={'Расписание'}
                    initValue={!!schedule.length}
                >
                    <ScheduleSelect
                        schedules={schedule}
                        subgroups={subgroup}
                        setSubgroups={setSubgroup}
                        setSchedules={setSchedule}
                    />
                </Collapse>
                <Collapse
                    title={'Типы событий'}
                    initValue={!!eventType.length}
                >
                    <EventTypeCheckList
                        value={eventType}
                        setValue={setEventType}
                    />
                </Collapse>
                <Collapse
                    title={'Статус события'}
                    initValue={!!eventType.length}
                >
                    <OrderStatusCheckList
                        value={orderStatus}
                        setValue={setOrderStatus}
                    />
                </Collapse>
                <Button
                    className={styles.button}
                    view={'brand'}
                    isDisabled={!isFiltered}
                    onClick={onSubmit}
                >
                    {isFiltered ? 'Применить' : 'Выберите хотя бы 1 фильтр'}
                </Button>
            </div>
        </BottomSheet>
    )
}