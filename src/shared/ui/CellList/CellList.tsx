import React from "react"

import {PropsDefault} from "@/shared/lib"

import styles from "./CellList.module.scss"
import {clsx} from "clsx";
import {Cell} from "@/shared/ui/Cell";
import {Icon} from "@/shared/ui/Icon";

export type CellListProps = PropsDefault<{
    label?: string
    data: {
        id: number | string
        name: string
    }[]
    onClick?: (id: number | string) => void
}>

export const CellList: React.FC<CellListProps> = ({
    className,
    label,
    data,
    onClick
}) => (
    <div
        className={clsx(
            styles.root,
            className,
        )}
    >
        {label && (
            <p className={styles.label}>{label}</p>
        )}
        <div>
            {data.map(item => (
                <Cell
                    className={styles.item}
                    key={item.id}
                    title={item.name}
                    onClick={() => onClick?.(item.id)}
                >
                    <Icon
                        className={styles.icon}
                        name={'chevron'}
                        size={20}
                        view={'placeholder'}
                    />
                </Cell>
            ))}
        </div>
    </div>
)