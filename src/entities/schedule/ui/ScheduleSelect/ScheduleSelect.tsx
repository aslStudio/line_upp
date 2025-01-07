import React, {useCallback, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {clsx} from "clsx"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {Schedule, scheduleListModel} from "@/entities/schedule/model"

import {PropsDefault} from "@/shared/lib"
import {TransitionFade} from "@/shared/ui/TransitionFade"
import {Badge, BadgeSkeleton} from "@/shared/ui/Badge"

import styles from './ScheduleSelect.module.scss'
import {Project, SubGroup} from "@/entities/projects/model";
import {CollapseRadio} from "@/shared/ui/CollapseRadio";

export type ScheduleSelectProps = PropsDefault<{
    schedules: Schedule[]
    subgroups: SubGroup[]
    setSchedules: (v: Schedule[]) => void
    setSubgroups: (v: SubGroup[]) => void
}>

export const ScheduleSelect: React.FC<ScheduleSelectProps> = ({
    className,
    schedules,
    subgroups,
    setSchedules,
    setSubgroups,
}) => {
    const {
        isPending,
        data,
    } = useSelector((state: RootState) => state.scheduleList)
    const dispatch = useDispatch<AppDispatch>()

    const getIsActiveSchedule = useCallback((item: Schedule) => {
        return schedules.findIndex(schedule => schedule.id === item.id) !== -1
    }, [schedules])

    const onSelectSchedule = useCallback((v: Schedule) => {
        if (getIsActiveSchedule(v)) {
            const copy = schedules.filter(schedule => schedule.id !== v.id)
            const copyGroups = subgroups.filter(item => item.projectId !== v.id)
            setSchedules(copy)
            setSubgroups(copyGroups)
        } else {
            setSchedules([
                ...schedules,
                v,
            ])
        }
    }, [getIsActiveSchedule, schedules, setSchedules])

    useEffect(() => {
        dispatch(scheduleListModel.thunks.getScheduleThunk())
    }, []);

    return (
        <TransitionFade
            className={clsx(
                className,
                styles.root
            )}
        >
            {isPending && (
                <div className={styles.wrapper}>
                    <BadgeSkeleton />
                    <BadgeSkeleton />
                </div>
            )}
            {!isPending && !!data.length && (
                <>
                    <div className={styles.wrapper}>
                        {data.map(schedule => (
                            <Badge
                                isActive={getIsActiveSchedule(schedule)}
                                onClick={() => onSelectSchedule(schedule)}
                            >
                                {schedule.name}
                            </Badge>
                        ))}
                    </div>
                    <>
                        {schedules.map(item => item.subgroups.length > 0 && (
                            <CollapseRadio
                                key={item.id}
                                className={styles.subgroup}
                                title={item.name}
                                data={item.subgroups}
                                value={subgroups}
                                setValue={v => {
                                    setSubgroups(toSubGroups(v as SubGroup[], item.id))
                                }}
                            />
                        ))}
                    </>
                </>
            )}
            {!isPending && !data.length && (
                <p className={styles.empty}>
                    У вас нет проектов в расписании
                </p>
            )}
        </TransitionFade>
    )
}

function toSubGroups(groups: SubGroup[], id: Project['id']) {
    return groups.reduce((prev, curr) => [
        ...prev,
        {
            ...curr,
            projectId: id,
        }
    ], [] as SubGroup[])
}