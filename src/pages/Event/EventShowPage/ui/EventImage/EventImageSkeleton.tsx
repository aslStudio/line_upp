import React from "react"
import {clsx} from "clsx"

import {PropsDefault} from "@/shared/lib"

import styles from './EventImage.module.scss'

export const EventImageSkeleton: React.FC<PropsDefault> = ({
    className
}) => (
    <div
        className={clsx(
            className,
            styles.root
        )}
    />
)