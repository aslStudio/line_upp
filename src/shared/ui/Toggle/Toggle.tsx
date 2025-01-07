import React from "react"
import {clsx} from "clsx"

import {PropsDefault} from "@/shared/lib"

import styles from './Toggle.module.scss'

export type ToggleProps = PropsDefault<{
    value: boolean
    setValue: (value: boolean) => void
}>

const ToggleComponent: React.FC<ToggleProps> = ({
    className,
    value,
    setValue
}) => {
    return (
        <div
            className={clsx(
                className,
                styles.root,
                {
                    [styles['is-active']]: value
                }
            )}
            onClick={() => {
                setValue(!value)
            }}
        />
    )
}

export const Toggle = React.memo(ToggleComponent)