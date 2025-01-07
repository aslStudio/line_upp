import React from "react"
import {clsx} from "clsx"

import { PropsDefaultWithChildren } from "@/shared/lib"

import { sizes, views } from './model.ts'
import styles from './InputBase.module.scss'

export type InputBaseProps = PropsDefaultWithChildren<{
    size?: typeof sizes[number]
    view?: typeof views[number]
    isError?: boolean
    onClick: () => void
}>

const InputBaseComponent: React.FC<InputBaseProps> = ({
    className,
    size = 'l',
    view = 'base',
    isError = false,
    onClick,
    children
}) => {
    return (
        <div
            className={clsx(
                className,
                styles.root,
                styles[`size_${size}`],
                styles[`view_${view}`],
                {
                    [styles['is-error']]: isError,
                }
            )}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

export const InputBase = React.memo(InputBaseComponent)