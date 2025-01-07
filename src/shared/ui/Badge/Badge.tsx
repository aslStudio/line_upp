import React from "react"
import {clsx} from "clsx"

import {PropsDefaultWithChildren} from "@/shared/lib"

import styles from './Badge.module.scss'

export type BadgeProps = PropsDefaultWithChildren<{
    isActive: boolean
    onClick: () => void
}>

const BadgeComponent: React.FC<BadgeProps> = ({
    className,
    isActive,
    onClick,
    children
}) => (
    <button
        className={clsx(
            className,
            styles.root,
            {
                [styles['is-active']]: isActive,
            }
        )}
        onClick={onClick}
    >
        {children}
    </button>
)

export const Badge = React.memo(BadgeComponent)