import React from "react"
import {clsx} from "clsx"
import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import {PropsDefault} from "@/shared/lib"

import styles from './EventImage.module.scss'

export const EventImage: React.FC<PropsDefault> = ({
    className
}) => {
    const {
        event
    } = useSelector((state: RootState) => state.eventExpand);

    return (
        <div
            className={clsx(
                className,
                styles.root,
            )}
        >
            <img
                src={event?.img}
                alt={'image'}
            />
        </div>
    )
}