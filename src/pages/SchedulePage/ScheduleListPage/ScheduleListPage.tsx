import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {ProjectList, ProjectListSkeleton} from "@/widgets/project"

import {scheduleFiltersModel} from "@/features/schedule/model"

import {Project} from "@/entities/projects/model"
import {scheduleListModel} from "@/entities/schedule/model"

import {useProjectNavigate} from "@/shared/lib/hooks"
import {RootPaths} from "@/shared/lib"
import {TransitionFade} from "@/shared/ui/TransitionFade"

import styles from './ScheduleListPage.module.scss'

export const ScheduleListPage = () => {
    const { goBack, navigate } = useProjectNavigate()

    const {
        data,
        isPending,
    } = useSelector((state: RootState) => state.scheduleList)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(scheduleListModel.thunks.getScheduleThunk())
    }, []);

    return (
        <>
            <TransitionFade>
                {isPending && (
                    <ProjectListSkeleton
                        title={'Выберите расписание '}
                    />
                )}
                {!isPending && data.length > 0 && (
                    <ProjectList
                        title={'Выберите расписание '}
                        list={data}
                        onSelected={schedule => {
                            dispatch(scheduleFiltersModel.actions.setFilters({
                                project: schedule as Project
                            }))
                            goBack()
                        }}
                        onInfo={schedule => {
                            navigate(
                                RootPaths.SCHEDULE,
                                schedule.id
                            )
                        }}
                    />
                )}
                {!isPending && data.length === 0 && (
                    <div className={styles.empty}>
                        <p className={styles.emoji}>🙈</p>
                        <p className={styles.title}>Пока расписаний нет</p>
                        <p className={styles.description}>Принимайте заявки, чтобы видеть новые расписания здесь</p>
                    </div>
                )}
            </TransitionFade>
        </>
    )
}