import { useEffect, useMemo } from "react"
import { Outlet } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import { NearestEventsModal } from "@/widgets/calendar"
import { CommonHeader } from "@/widgets/common"
import { EventSearchInput } from "@/widgets/event"

import {useEventsCalendarFetch} from "@/features/events/hooks"
import {CalendarFilterButton} from "@/features/calendar/ui/CalendarFilterButton"
import {FavoriteFilterButton} from "@/features/calendar"

import { useRouteTransitionContext } from "@/shared/lib/providers/RouteTransitionProvider"
import {useTelegram} from "@/shared/lib/hooks/useTelegram.ts"

import styles from './Calendar.module.scss'
import {eventsSearchModel} from "@/features/events/model";

export const CalendarPage = () => {
    const {
        onFetchFirst
    } = useEventsCalendarFetch()

    const { filters } = useSelector((state: RootState) => state.eventsFilters)
    const dispatch = useDispatch<AppDispatch>()

    const {
        mainClass
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
        onFetchFirst()
    }, [filters]);

    return (
        <div
            id={'calendarPage'}
            className={styles.root}
        >
            <CommonHeader
                isFiltered={isFiltered}

                FavoriteButton={<FavoriteFilterButton />}
                FilterButton={<CalendarFilterButton />}
                InputSearch={props => (
                    <EventSearchInput
                        {...props}
                    />
                )}

                onClearSearch={() => {
                    dispatch(eventsSearchModel.actions.reset())
                }}
            />
            <div
                className={mainClass}
            >
                <Outlet />
            </div>
            <NearestEventsModal />
        </div>
    )
}