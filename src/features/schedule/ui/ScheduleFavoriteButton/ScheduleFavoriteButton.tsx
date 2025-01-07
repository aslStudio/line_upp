import React from "react"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {scheduleFiltersModel} from "@/features/schedule/model"

import {PropsDefault} from "@/shared/lib"
import {Button} from "@/shared/ui/Button"
import {Icon} from "@/shared/ui/Icon"

export type ScheduleFavoriteButtonProps = PropsDefault

export const ScheduleFavoriteButton: React.FC<ScheduleFavoriteButtonProps> = () => {
    const {
        filters
    } = useSelector((state: RootState) => state.scheduleFilters)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <Button
            size={'s'}
            view={'secondary-flat'}
            onClick={() => {
                dispatch(scheduleFiltersModel.actions.setFilters({
                    isFavorite: !filters.isFavorite
                }))
            }}
        >
            <Icon
                name={filters.isFavorite ? 'favorite-filled' : 'favorite-outline'}
                view={filters.isFavorite ? 'red' : 'placeholder'}
                size={25}
            />
        </Button>
    )
}