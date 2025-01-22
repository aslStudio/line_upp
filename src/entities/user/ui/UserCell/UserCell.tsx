import React from "react"

import {PropsDefault} from "@/shared/lib"
import {Icon} from "@/shared/ui/Icon"

import styles from './UserCell.module.scss'

export type UserCellProps = PropsDefault<{
    id: number | string
    avatar: string
    name: string
    onClick?: (id: number | string) => void
}>

export const UserCell: React.FC<UserCellProps> = ({
    id,
    avatar,
    name,
    onClick,
}) => {
    return (
        <div
            className={styles.root}
            onClick={() => {
                onClick?.(id)
            }}
        >
            <div className={styles.wrapper}>
                <div className={styles.avatar}>
                    <img
                        src={avatar}
                        alt={'avatar'}
                    />
                </div>
                <p className={styles.name}>{name}</p>
            </div>
            <Icon
                className={styles.icon}
                name={'chevron'}
                view={'placeholder'}
                size={22}
            />
        </div>
    )
}