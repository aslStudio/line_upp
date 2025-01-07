import React from "react"

import {PropsDefaultWithChildren} from "@/shared/lib"
import {Icon} from "@/shared/ui/Icon"

import styles from './Radio.module.scss'
import {clsx} from "clsx";

export type RadioProps = PropsDefaultWithChildren<{
    value: boolean
    setValue: (value: boolean) => void
}>

const RadioComponent: React.FC<RadioProps> = ({
    className,
    value,
    setValue,
    children,
}) => {
    return (
        <button
            className={clsx(
                className,
                styles.root,
                {
                    [styles['is-active']]: value,
                }
            )}
            onClick={() => setValue(!value)}
        >
            <div className={styles.radio}>
                <Icon
                    className={styles.icon}
                    name={'checked'}
                    view={'dark'}
                    size={20}
                />
            </div>
            <div className={styles.text}>{children}</div>
        </button>
    )
}

export const Radio = React.memo(RadioComponent)