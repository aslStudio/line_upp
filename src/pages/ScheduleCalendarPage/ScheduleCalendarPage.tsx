import {useEffect, useMemo} from "react"
import {Outlet} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {CommonHeader} from "@/widgets/common"
import {NearestEventsModal} from "@/widgets/calendar"
import {ScheduleEventsSearchInput} from "@/widgets/schedule"

import {useEventsScheduleFetch} from "@/features/schedule/hooks"
import {ScheduleFavoriteButton, ScheduleFilterButton} from "@/features/schedule/ui"
import {scheduleFiltersModel, scheduleSearchModel} from "@/features/schedule/model"

import {Project} from "@/entities/projects/model"
import {scheduleListModel} from "@/entities/schedule/model"

import {useTelegram} from "@/shared/lib/hooks/useTelegram.ts"
import {useRouteTransitionContext} from "@/shared/lib/providers"

import styles from './ScheduleCalendarPage.module.scss'
import {useProjectNavigate} from "@/shared/lib/hooks";
import {RootPaths, SchedulePaths} from "@/shared/lib";

export const ScheduleCalendarPage = () => {
    const { navigate } = useProjectNavigate()

    const {
        onFetchFirst,
    } = useEventsScheduleFetch()

    const { filters } = useSelector((state: RootState) => state.scheduleFilters)
    const { data: scheduleList } = useSelector((state: RootState) => state.scheduleList)
    const dispatch = useDispatch<AppDispatch>()

    const {
        scheduleClass
    } = useRouteTransitionContext()
    const { setHeaderColor } = useTelegram()

    const isFiltered = useMemo<boolean>(() => {
        return Object.values(filters).reduce((prev, curr) => {
            if (Array.isArray(curr)) {
                return prev || !!curr.length
            }

            return prev || !!curr
        }, false) as boolean
    }, [filters])

    useEffect(() => {
        setHeaderColor('#1E1E1E')
        onFetchFirst()
    }, []);

    useEffect(() => {
        dispatch(scheduleListModel.thunks.getScheduleThunk())
    }, []);

    useEffect(() => {
        if (scheduleList[0] && !filters.project) {
            dispatch(scheduleFiltersModel.actions.setFilters({
                project: scheduleList[0] as Project
            }))
        }
    }, [scheduleList]);

    useEffect(() => {
        onFetchFirst()
    }, [filters]);

    return (
        <div
            id={'calendarPage'}
            className={styles.root}
        >
            <CommonHeader
                title={'Расписание'}
                mainFilterValue={filters.project ? filters.project.name : 'Выберите расписание'}

                isFiltered={isFiltered}

                FavoriteButton={<ScheduleFavoriteButton />}
                FilterButton={<ScheduleFilterButton />}
                InputSearch={props => (
                    <ScheduleEventsSearchInput
                        {...props}
                    />
                )}

                onClearSearch={() => {
                    dispatch(scheduleSearchModel.actions.reset())
                }}
                onClickMainFilter={() => {
                    navigate(
                        RootPaths.SCHEDULE,
                        SchedulePaths.LIST,
                    )
                }}
            />
            <div
                className={scheduleClass}
            >
                <Outlet />
            </div>
            <NearestEventsModal />
        </div>
    )
}