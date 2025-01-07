import React from "react"
import {clsx} from "clsx"

import {PropsDefault} from "@/shared/lib"

import styles from './Badge.module.scss'

export type BadgeSkeletonProps = PropsDefault

export const BadgeSkeleton: React.FC<BadgeSkeletonProps> = ({
    className
}) => (
    <div
        className={clsx(
            className,
            styles.root,
            styles['is-skeleton']
        )}
    />
)