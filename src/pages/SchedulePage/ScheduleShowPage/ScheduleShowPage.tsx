import {useEffect} from "react"
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {scheduleExpandModel} from "@/entities/schedule/model"

import {TransitionFade} from "@/shared/ui/TransitionFade"
import {SkeletonWrapper} from "@/shared/ui/SkeletonWrapper"

import {
    ScheduleName,
    ScheduleComment,
    ScheduleNote,
    ScheduleOrganizers,
    ScheduleParticipants,
    ScheduleLeaveButton,

    ScheduleNameSkeleton,
    ScheduleNoteSkeleton
} from './ui'
import styles from './ScheduleShowPage.module.scss'

export const ScheduleShowPage = () => {
    const params = useParams()

    const {
        isPending
    } = useSelector((state: RootState) => state.scheduleExpand)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(scheduleExpandModel.thunks.fetchExpandThunk({
            id: Number(params.id)
        }))
    }, []);

    return (
        <TransitionFade>
            {isPending && (
                <SkeletonWrapper
                    className={styles.wrapper}
                >
                    <ScheduleNameSkeleton />
                    <ScheduleNoteSkeleton />
                </SkeletonWrapper>
            )}
            {!isPending && (
                <div
                    className={styles.wrapper}
                >
                    <ScheduleName />
                    <ScheduleComment />
                    <ScheduleNote />
                    <ScheduleOrganizers />
                    <ScheduleParticipants />
                    <ScheduleLeaveButton />
                </div>
            )}
        </TransitionFade>
    )
}