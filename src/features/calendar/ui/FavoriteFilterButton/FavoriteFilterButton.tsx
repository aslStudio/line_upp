import React from "react"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {eventsFiltersModel} from "@/features/events/model"

import {PropsDefault} from "@/shared/lib"
import {Button} from "@/shared/ui/Button"
import {Icon} from "@/shared/ui/Icon"

export type FavoriteFilterButtonProps = PropsDefault

export const FavoriteFilterButton: React.FC<FavoriteFilterButtonProps> = () => {
    const {
        filters
    } = useSelector((state: RootState) => state.eventsFilters)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <Button
            size={'s'}
            view={'secondary-flat'}
            onClick={() => {
                dispatch(eventsFiltersModel.actions.setFilters({
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