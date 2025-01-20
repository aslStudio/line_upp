import React from "react"

import {PropsDefault} from "@/shared/lib"
import {TransitionFade} from "@/shared/ui/TransitionFade"

import styles from './UserProfileInfoCell.module.scss'
import {clsx} from "clsx";

export type UserProfileInfoCellProps = PropsDefault<{
    isHidden: boolean
    value: string
    label: string
}>

export const UserProfileInfoCell: React.FC<UserProfileInfoCellProps> = ({
    className,
    isHidden,
    value,
    label
}) => {
    return (
        <div
            className={clsx(
                styles.root,
                className,
            )}
        >
            <TransitionFade>
                {isHidden && (
                    <p className={styles.hidden}>Скрыто</p>
                )}
                {!isHidden && (
                    <p className={styles.value}>{value}</p>
                )}
            </TransitionFade>
            <p className={styles.label}>{label}</p>
        </div>
    )
}