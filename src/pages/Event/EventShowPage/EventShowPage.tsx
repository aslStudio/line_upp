import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import { useParams } from "react-router-dom"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {expandModel} from "@/entities/events/model"

import {TransitionFade} from "@/shared/ui/TransitionFade"
import {SkeletonWrapper} from "@/shared/ui/SkeletonWrapper"
import {InfoSectionSkeleton} from "@/shared/ui/InfoSection"

import {
    EventImage,
    EventHeader,
    EventNote,
    AboutEvent,
    CommentEvent,
    EventLocation,
    EventPrice,
    EventOrganizers,
    EventParticipants,
    EventInviteLink,
    EventButtons,

    EventImageSkeleton,
    EventHeaderSkeleton,
    EventNoteSkeleton,
} from './ui'
import styles from './EventShowPage.module.scss'

export const EventShowPage = () => {
    const params = useParams()

    const {
        isPending
    } = useSelector((state: RootState) => state.eventExpand)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(expandModel.thunks.fetchExpandThunk({
            id: Number(params.id)
        }))
    }, []);

    return (
        <TransitionFade>
            {isPending && (
                <SkeletonWrapper className={styles.wrapper}>
                    <EventImageSkeleton />
                    <EventHeaderSkeleton />
                    <EventNoteSkeleton />
                    <InfoSectionSkeleton />
                    <InfoSectionSkeleton />
                </SkeletonWrapper>
            )}
            {!isPending && (
                <div className={styles.wrapper}>
                    <EventImage />
                    <EventHeader />
                    <EventNote />
                    <AboutEvent />
                    <CommentEvent />
                    <EventLocation />
                    <EventPrice />
                    <EventOrganizers />
                    <EventParticipants />
                    <EventInviteLink />
                    <EventButtons />
                </div>
            )}
        </TransitionFade>
    )
}