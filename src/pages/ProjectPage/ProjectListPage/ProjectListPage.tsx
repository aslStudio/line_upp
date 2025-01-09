import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {ProjectList, ProjectListSkeleton} from "@/widgets/project"

import {projectFiltersModel} from "@/features/project/model"

import {Project, projectsListModel} from "@/entities/projects/model"

import {useProjectNavigate} from "@/shared/lib/hooks"
import {TransitionFade} from "@/shared/ui/TransitionFade"
import {RootPaths} from "@/shared/lib"
import {ButtonCell} from "@/shared/ui/ButtonCell"

import styles from './ProjectListPage.module.scss'

export const ProjectListPage = () => {
    const { navigate, goBack } = useProjectNavigate()

    const {
        data,
        isPending,
    } = useSelector((state: RootState) => state.projectList)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(projectsListModel.thunks.getProjectsThunk())
    }, []);

    return (
        <>
            <TransitionFade>
                {isPending && (
                    <ProjectListSkeleton
                        title={'Выберите проект'}
                    />
                )}
                {!isPending && data.length > 0 && (
                    <div className={styles.wrapper}>
                        <ProjectList
                            title={'Выберите проект'}
                            list={data}
                            onSelected={project => {
                                dispatch(projectFiltersModel.actions.setFilters({
                                    project: project as Project,
                                }))
                                goBack()
                            }}
                            onInfo={project => {
                                navigate(
                                    RootPaths.PROJECTS,
                                    project.id,
                                )
                            }}
                        />
                        <ButtonCell
                            iconStyles={{
                                transform: 'rotate(45deg)',
                            }}
                            icon={'cross-icon'}
                            withHorizontalPadding={true}
                        >
                            Добавить
                        </ButtonCell>
                    </div>
                )}
                {!isPending && data.length === 0 && (
                    <div className={styles.empty}>
                        <p className={styles.emoji}>🙈</p>
                        <p className={styles.title}>Пока проектов нет</p>
                        <p className={styles.description}>Принимайте заявки, чтобы видеть новые расписания здесь</p>
                    </div>
                )}
            </TransitionFade>
        </>
    )
}