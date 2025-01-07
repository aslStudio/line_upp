import React from "react"
import {clsx} from "clsx"

import {PropsDefaultWithChildren} from "@/shared/lib"

import styles from './Cell.module.scss'

export type CellProps = PropsDefaultWithChildren<{
    title: string
    size?: 'm' | 'l'
    description?: string
    onClick?: () => void
}>

const CellComponent: React.FC<CellProps> = ({
    className,
    title,
    size = 'm',
    description,
    children,
    onClick,
}) => {
    return (
        <div
            className={clsx(
                className,
                styles.root,
                styles[`size_${size}`]
            )}
            onClick={onClick}
        >
            <div className={styles.wrapper}>
                <p className={styles.title}>{title}</p>
                {description && (
                    <p className={styles.description}>{description}</p>
                )}
            </div>
            {children}
        </div>
    )
}

export const Cell = React.memo(CellComponent)