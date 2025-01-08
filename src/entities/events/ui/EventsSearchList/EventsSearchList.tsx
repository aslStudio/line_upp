import React from "react"
import {createPortal} from "react-dom"
import {AnimatePresence, motion} from "framer-motion"
import {clsx} from "clsx"

import {EventCard, EventCardSkeleton} from "@/entities/events/ui/EventCard"
import {Event} from "@/entities/events/model"

import {TransitionFade} from "@/shared/ui/TransitionFade"

import styles from './EventsSearchList.module.scss'

export type EventsSearchListProps = {
    isShow: boolean
    isPending: boolean
    offsetTop?: 's' | 'm'
    data: Event[]
}

export const EventsSearchList: React.FC<EventsSearchListProps> = ({
    isShow,
    isPending,
    offsetTop = 'm',
    data,
}) => {
    return createPortal(
        <AnimatePresence>
            {isShow && (
                <motion.div
                    className={clsx(
                        styles.root,
                        styles[`offset_${offsetTop}`]
                    )}
                    initial={{
                        opacity: 0,
                        y: 100,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    exit={{
                        opacity: 0,
                        y: 100,
                    }}
                >
                    <TransitionFade>
                        {!isPending && (
                            <div
                                key={'Content'}
                                className={styles.wrapper}
                            >
                                {data.map(event => (
                                    <EventCard
                                        event={event}
                                    />
                                ))}
                            </div>
                        )}
                        {isPending && (
                            <div
                                key={'Skeleton'}
                                className={styles.wrapper}
                            >
                                <EventCardSkeleton />
                            </div>
                        )}
                    </TransitionFade>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    )
}