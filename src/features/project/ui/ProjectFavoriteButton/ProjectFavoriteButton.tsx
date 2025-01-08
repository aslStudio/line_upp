import React from "react"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {projectFiltersModel} from "@/features/project/model"

import {PropsDefault} from "@/shared/lib"
import {Button} from "@/shared/ui/Button"
import {Icon} from "@/shared/ui/Icon"

export type ProjectFavoriteButtonProps = PropsDefault

export const ProjectFavoriteButton: React.FC<ProjectFavoriteButtonProps> = ({
    className
}) => {
    const {
        filters
    } = useSelector((state: RootState) => state.projectFilters)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <Button
            className={className}
            size={'s'}
            view={'secondary-flat'}
            onClick={() => {
                dispatch(projectFiltersModel.actions.setFilters({
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