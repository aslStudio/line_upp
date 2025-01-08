import React from "react"

import {PropsDefault} from "@/shared/lib"

import styles from './UserCellList.module.scss'
import {clsx} from "clsx";

export type UserCellListProps = PropsDefault<{
    title?: string
    description?: string
    list: {
        id: number
        avatar: string
        name: string
    }[]
    render: (data: {
        id: number
        avatar: string
        name: string
    }) => React.ReactNode
    withBorder?: boolean
}>

const UserCellListComponent: React.FC<UserCellListProps> = ({
    className,
    title,
    description,
    list,
    withBorder = false,
    render,
}) => (
    <div
        className={clsx(
            className,
            styles.root,
            {
                [styles['with-border']]: withBorder,
            }
        )}
    >
        {title && (
            <div className={styles.header}>
                <p className={styles.title}>{title}</p>
                {description && (
                    <p className={styles.description}>{description}</p>
                )}
            </div>
        )}
        <div>
            {list.map((item, index) => (
                <div key={item.id}>
                    {render(item)}
                    {index !== list.length - 1 && (
                        <div
                            className={styles.divider}
                        />
                    )}
                </div>
            ))}
        </div>
    </div>
)

export const UserCellList = React.memo(UserCellListComponent)