import React, {useCallback} from "react"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {projectSearchModel} from "@/features/project/model"

import {EventsSearchList} from "@/entities/events/ui";

import {PropsDefault} from "@/shared/lib"
import {InputSearch} from "@/shared/ui/fields/InputSearch"

export type ProjectEventsSearchInputProps = PropsDefault<{
    inputRef: React.RefObject<HTMLInputElement | null>
    isFocused: boolean
    onFocus: () => void
}>

export const ProjectEventsSearchInput: React.FC<ProjectEventsSearchInputProps> = ({
    className,
    inputRef,
    isFocused,
    onFocus,
}) => {
    const { filters } = useSelector((state: RootState) => state.projectFilters)
    const {
        searchValue,
        data,
        isPending,
    } = useSelector((state: RootState) => state.projectSearch)
    const dispatch = useDispatch<AppDispatch>()

    const onSearch = useCallback((search: string) => {
        dispatch(projectSearchModel.thunks.searchThunk({
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
                    dispatch(projectSearchModel.actions.setSearch(v))
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