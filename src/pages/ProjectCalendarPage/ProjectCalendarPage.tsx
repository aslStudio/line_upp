import {useEffect, useMemo} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Outlet} from "react-router-dom"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {CommonHeader} from "@/widgets/common"
import {ProjectEventsSearchInput} from "@/widgets/project"
import {NearestEventsModal} from "@/widgets/calendar"

import {ProjectFavoriteButton, ProjectFilterButton} from "@/features/project/ui"
import {useEventsProjectFetch} from "@/features/project/hooks"
import {projectFiltersModel, projectSearchModel} from "@/features/project/model"

import {Project, projectsListModel} from "@/entities/projects/model"

import {useRouteTransitionContext} from "@/shared/lib/providers"
import {useTelegram} from "@/shared/lib/hooks"

import styles from './ProjectCalendarPage.module.scss'

export const ProjectCalendarPage = () => {
    const {
        onFetchFirst
    } = useEventsProjectFetch()

    const { filters } = useSelector((state: RootState) => state.projectFilters)
    const { data: projectList } = useSelector((state: RootState) => state.projectList)
    const dispatch = useDispatch<AppDispatch>()

    const {
        projectClass
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
        dispatch(projectsListModel.thunks.getProjectsThunk())
    }, []);

    useEffect(() => {
        if (projectList[0] && !filters.project) {
            dispatch(projectFiltersModel.actions.setFilters({
                project: projectList[0] as Project
            }))
        }
    }, [projectList]);

    useEffect(() => {
        onFetchFirst()
    }, [filters]);

    return (
        <div
            id={'calendarPage'}
            className={styles.root}
        >
            <CommonHeader
                title={'Проект'}
                mainFilterValue={filters.project ? filters.project.name : 'Выберите проект'}

                isFiltered={isFiltered}

                FavoriteButton={<ProjectFavoriteButton />}
                FilterButton={<ProjectFilterButton />}
                InputSearch={props => (
                    <ProjectEventsSearchInput
                        {...props}
                    />
                )}

                onClearSearch={() => {
                    dispatch(projectSearchModel.actions.reset())
                }}
            />
            <div
                className={projectClass}
            >
                <Outlet />
            </div>
            <NearestEventsModal />
        </div>
    )
}