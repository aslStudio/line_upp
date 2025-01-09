import {useEffect} from "react"
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {projectExpandModel} from "@/entities/projects/model"

import {TransitionFade} from "@/shared/ui/TransitionFade"
import {SkeletonWrapper} from "@/shared/ui/SkeletonWrapper"

import {
    ProjectName,
    ProjectComment,
    ProjectNote,
    ProjectOrganizers,
    ProjectAccess,
    ProjectParticipants,
    ProjectButtons,

    ProjectNameSkeleton,
    ProjectNoteSkeleton,
} from './ui'
import styles from './ProjectShowPage.module.scss'

export const ProjectShowPage = () => {
    const params = useParams()

    const {
        isPending
    } = useSelector((state: RootState) => state.projectExpand)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(projectExpandModel.thunks.fetchExpandProject({
            id: `${params.id}`,
        }))
    }, [])

    return (
        <TransitionFade>
            {isPending && (
                <SkeletonWrapper className={styles.wrapper}>
                    <ProjectNameSkeleton />
                    <ProjectNoteSkeleton />
                </SkeletonWrapper>
            )}
            {!isPending && (
                <div className={styles.wrapper}>
                    <ProjectName />
                    <ProjectComment />
                    <ProjectNote />
                    <ProjectOrganizers />
                    <ProjectAccess />
                    <ProjectParticipants />
                    <ProjectButtons />
                </div>
            )}
        </TransitionFade>
    )
}