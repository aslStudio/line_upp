import React, {useCallback, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {clsx} from "clsx"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {Project, projectsListModel, SubGroup} from "@/entities/projects/model"

import {PropsDefault} from "@/shared/lib"
import {TransitionFade} from "@/shared/ui/TransitionFade"
import {Badge, BadgeSkeleton} from "@/shared/ui/Badge"

import styles from './ProjectSelect.module.scss'
import {CollapseRadio} from "@/shared/ui/CollapseRadio";

export type ProjectSelectProps = PropsDefault<{
    projects: Project[]
    subgroups: SubGroup[]
    setProjects: (projects: Project[]) => void
    setSubGroups: (subGroups: SubGroup[]) => void
}>

export const ProjectSelect: React.FC<ProjectSelectProps> = ({
    className,
    projects,
    subgroups,
    setProjects,
    setSubGroups,
}) => {
    const {
        isPending,
        data,
    } = useSelector((state: RootState) => state.projectList)
    const dispatch = useDispatch<AppDispatch>()

    const getIsActiveProject = useCallback((v: Project) => {
        return projects.findIndex(project => project.id === v.id) !== -1
    }, [projects])

    const onProjectsSelect = useCallback((v: Project) => {
        if (getIsActiveProject(v)) {
            const copy = projects.filter(item => item.id !== v.id)
            const copyGroups = subgroups.filter(item => item.projectId !== v.id)
            setProjects(copy)
            setSubGroups(copyGroups)
        } else {
            setProjects([
                ...projects,
                v,
            ])
        }
    }, [getIsActiveProject, projects, subgroups, setProjects, setSubGroups])

    useEffect(() => {
        dispatch(projectsListModel.thunks.getProjectsThunk())
    }, []);

    return (
        <TransitionFade className={clsx(className, styles.root)}>
            {isPending && (
                <div className={styles.wrapper}>
                    <BadgeSkeleton />
                    <BadgeSkeleton />
                </div>
            )}
            {!isPending && (
                <>
                    <div className={styles.wrapper}>
                        {data.map(project => (
                            <Badge
                                isActive={getIsActiveProject(project)}
                                onClick={() => onProjectsSelect(project)}
                            >
                                {project.name}
                            </Badge>
                        ))}
                    </div>
                    <>
                        {projects.map(item => item.subgroups.length > 0 && (
                            <CollapseRadio
                                key={item.id}
                                className={styles.subgroup}
                                title={item.name}
                                data={item.subgroups}
                                value={subgroups}
                                setValue={v => {
                                    setSubGroups(toSubGroups(v as SubGroup[], item.id))
                                }}
                            />
                        ))}
                    </>
                </>
            )}
        </TransitionFade>
    )
}

function toSubGroups(groups: SubGroup[], id: Project['id']) {
    return groups.reduce((prev, curr) => [
        ...prev,
        {
            ...curr,
            projectId: id,
        }
    ], [] as (SubGroup & {
        projectId: number
    })[])
}