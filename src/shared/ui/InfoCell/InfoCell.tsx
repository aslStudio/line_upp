import React from "react"
import {clsx} from "clsx"

import {PropsDefault} from "@/shared/lib"

import styles from './InfoCell.module.scss'

export type InfoCellProps = PropsDefault<{
    title: string
    description: string
}>

export const InfoCell: React.FC<InfoCellProps> = ({
    className,
    title,
    description
}) => {
    return (
        <div
            className={clsx(
                className,
                styles.root
            )}
        >
            <p
                className={styles.title}
            >
                {title}
            </p>
            <p
                className={styles.description}
            >
                {description}
            </p>
        </div>
    )
}