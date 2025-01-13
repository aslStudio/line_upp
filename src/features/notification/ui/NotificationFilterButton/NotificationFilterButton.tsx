import React, {useCallback, useEffect, useMemo, useState} from "react"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {BottomSheet, useModal} from "@/shared/ui/BottomSheet"
import {Button} from "@/shared/ui/Button"
import {Icon} from "@/shared/ui/Icon"

import styles from './NotificationFilterButton.module.scss'
import {Project, SubGroup} from "@/entities/projects/model";
import {Schedule} from "@/entities/schedule/model";
import {notificationFilterModel} from "@/features/notification/model";
import {TransitionFade} from "@/shared/ui/TransitionFade";
import {ProjectSelect} from "@/entities/projects/ui";
import {Collapse} from "@/shared/ui/Collapse";
import {ScheduleSelect} from "@/entities/schedule/ui";

export const NotificationFilterButton = () => {
    const { isOpen, open, close } = useModal()

    return (
        <>
            <Button
                className={styles.root}
                view={'secondary-flat'}
                size={'s'}
                onClick={open}
            >
                <Icon
                    name={'filter'}
                    view={'placeholder'}
                    size={20}
                />
            </Button>
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
    const { filters } = useSelector((state: RootState) => state.notificationFilters)
    const dispatch = useDispatch<AppDispatch>()

    const [project, setProject] = useState<Project[]>([])
    const [subgroup, setSubgroup] = useState<SubGroup[]>([])
    const [schedule, setSchedule] = useState<Schedule[]>([])

    const isFiltered = useMemo(() => {
        return (
            !!project.length ||
            !!subgroup.length ||
            !!schedule.length
        )
    }, [project.length, schedule.length, subgroup.length])

    const initLocalValuesHandler = useCallback(() => {
        setProject(filters.project)
        setSubgroup(filters.subgroup)
        setSchedule(filters.schedule)
    }, [filters])

    const onSubmit = useCallback(() => {
        dispatch(notificationFilterModel.actions.setFilter({
            project,
            subgroup,
            schedule,
        }))
        setIsOpen(false)
    }, [project, subgroup, schedule])

    const onReset = useCallback(() => {
        dispatch(notificationFilterModel.actions.reset())
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