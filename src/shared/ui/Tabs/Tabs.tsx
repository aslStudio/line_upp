import React from "react"
import {clsx} from "clsx"

import {PropsDefault} from "@/shared/lib"

import styles from './Tabs.module.scss'

export type TabsProps = PropsDefault<{
    value: number | string
    setValue: (newValue: number | string) => void
    data: {
        id: number | string
        text: string
    }[]
}>

const TabsComponent: React.FC<TabsProps> = ({
    className,
    value,
    setValue,
    data
}) => {
    return (
        <div className={clsx(
            className,
            styles.root
        )}>
            {data.map(item => (
                <button
                    key={item.id}
                    className={clsx(
                        styles.item,
                        {
                            [styles['is-active']]: item.id === value,
                        }
                    )}
                    onClick={() => setValue(item.id)}
                >
                    {item.text}
                </button>
            ))}
        </div>
    )
}

export const Tabs = React.memo(TabsComponent)