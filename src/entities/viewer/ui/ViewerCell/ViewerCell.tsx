import React from "react"

import {PropsDefault} from "@/shared/lib"

import styles from './ViewerCell.module.scss'
import {clsx} from "clsx";

export type ViewerCellProps = PropsDefault<{
    avatar: string
    username: string
    name: string
}>

export const ViewerCell: React.FC<ViewerCellProps> = ({
    className,
    avatar,
    username,
    name
}) => (
    <div
        className={clsx(
            styles.root,
            className,
        )}
    >
        <div className={styles.avatar}>
            <img
                src={avatar}
                alt={'avatar'}
            />
        </div>
        <div>
            <p className={styles.title}>{username}</p>
            <p className={styles.name}>{name}</p>
        </div>
    </div>
)