import { useCallback } from "react"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {eventsListModel, PERIOD_LENGTH} from "@/entities/events/model"

import {addDaysToTimestamp} from "@/shared/lib/date.ts"

export const useEventsCalendarFetch = () => {
    const {
        filters
    } = useSelector((state: RootState) => state.eventsFilters)
    const {
        data,
        startDate,
        endDate,
        isFetching,
        isPending,
    } = useSelector((state: RootState) => state.eventList)
    const dispatch = useDispatch<AppDispatch>()

    const onFetchNext = useCallback(() => {
        dispatch(eventsListModel.thunks.fetchNextPeriodThunk({
            isFavorite: filters.isFavorite,
            startDate: endDate,
            endDate: addDaysToTimestamp(endDate, PERIOD_LENGTH),
            color: filters.color.map(item => item.id),
            project: filters.project.map(item => item.id),
            subGroup: filters.subgroup.map(item => item.id),
            schedule: filters.schedule.map(item => item.id),
            eventType: filters.eventType,
            orderType: filters.orderStatus,
        }))
    }, [
        filters,
        startDate,
        endDate,
    ])

    const onFetchFirst = useCallback(() => {
        dispatch(eventsListModel.thunks.fetchFirstPeriodThunk({
            isFavorite: filters.isFavorite,
            color: filters.color.map(item => item.id),
            project: filters.project.map(item => item.id),
            subGroup: filters.subgroup.map(item => item.id),
            schedule: filters.schedule.map(item => item.id),
            eventType: filters.eventType,
            orderType: filters.orderStatus,
        }))
    }, [
        filters,
    ])

    return {
        data,

        isFetching,
        isPending,

        onFetchNext,
        onFetchFirst,
    }
}