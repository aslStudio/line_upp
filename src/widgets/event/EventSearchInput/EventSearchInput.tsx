import React, {useCallback} from "react"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {eventsSearchModel} from "@/features/events/model"

import {EventsSearchList} from "@/entities/events/ui";

import {PropsDefault} from "@/shared/lib"
import {InputSearch} from "@/shared/ui/fields/InputSearch"

export type EventSearchInputProps = PropsDefault<{
    inputRef: React.RefObject<HTMLInputElement | null>
    isFocused: boolean
    onFocus: () => void
}>

export const EventSearchInput: React.FC<EventSearchInputProps> = ({
    className,
    inputRef,
    isFocused,
    onFocus,
}) => {
    const { filters } = useSelector((state: RootState) => state.eventsFilters)
    const {
        searchValue,
        data,
        isPending,
    } = useSelector((state: RootState) => state.eventsSearch)
    const dispatch = useDispatch<AppDispatch>()

    const onSearch = useCallback((search: string) => {
        dispatch(eventsSearchModel.thunks.searchThunk({
            search,
            isFavorite: filters.isFavorite,
            color: filters.color.map(item => item.id),
            project: filters.project.map(item => item.id),
            subGroup: filters.subgroup.map(item => item.id),
            schedule: filters.schedule.map(item => item.id),
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
                offsetTop={'s'}
                isShow={isFocused}
                isPending={isPending}
                data={data}
            />
        </>
    )
}