import React from "react"

import {PropsDefaultWithChildren} from "@/shared/lib"
import {TransitionFade} from "@/shared/ui/TransitionFade"
import {Icon} from "@/shared/ui/Icon"

import styles from './Checkbox.module.scss'
import {clsx} from "clsx";

export type CheckboxProps = PropsDefaultWithChildren<{
    value: boolean
    setValue: (value: boolean) => void
}>

export const Checkbox: React.FC<CheckboxProps> = ({
    className,
    value,
    setValue,
    children
}) => {
    return (
        <div
            className={clsx(
                styles.root,
                className,
            )}
            onClick={() => {
                setValue(!value)
            }}
        >
            <div className={styles.check}>
                <TransitionFade className={styles.icon}>
                    {value && (
                        <Icon
                            name={'checked'}
                            view={'brand'}
                            size={28}
                        />
                    )}
                </TransitionFade>
            </div>
            <p>{children}</p>
        </div>
    )
}