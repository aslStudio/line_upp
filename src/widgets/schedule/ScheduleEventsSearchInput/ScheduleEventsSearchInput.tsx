import React, {useCallback} from "react"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {eventsSearchModel} from "@/features/events/model"

import {EventsSearchList} from "@/entities/events/ui";

import {PropsDefault} from "@/shared/lib"
import {InputSearch} from "@/shared/ui/fields/InputSearch"

export type ScheduleEventsSearchInputProps = PropsDefault<{
    inputRef: React.RefObject<HTMLInputElement | null>
    isFocused: boolean
    onFocus: () => void
}>

export const ScheduleEventsSearchInput: React.FC<ScheduleEventsSearchInputProps> = ({
    className,
    inputRef,
    isFocused,
    onFocus,
}) => {
    const { filters } = useSelector((state: RootState) => state.scheduleFilters)
    const {
        searchValue,
        data,
        isPending,
    } = useSelector((state: RootState) => state.scheduleSearch)
    const dispatch = useDispatch<AppDispatch>()

    const onSearch = useCallback((search: string) => {
        dispatch(eventsSearchModel.thunks.searchThunk({
            search,
            isFavorite: filters.isFavorite,
            color: filters.color.map(item => item.id),
            project: filters.project ? [filters.project.id] : [],
            subGroup: filters.subgroup.map(item => item.id),
            schedule: [],
            eventType: filters.eventType,
            orderType: filters.orderStatus,
        }))
    }, [filters, dispatch])

    return (
        <>
            <InputSearch
                className={className}
                rootRef={inputRef}
                value={searchValue}
                onInput={v => {
                    dispatch(eventsSearchModel.actions.setSearch(v))
                }}
                isLoading={false}
                onSearch={onSearch}
                onFocus={onFocus}
            />
            <EventsSearchList
                isShow={isFocused}
                isPending={isPending}
                data={data}
            />
        </>
    )
}