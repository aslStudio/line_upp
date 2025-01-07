import React, {useState} from "react"
import {clsx} from "clsx"

import {Icon} from "@/shared/ui/Icon"
import { PropsDefaultWithChildren } from "@/shared/lib"
import {TransitionExpand} from "@/shared/ui/TransitionExpand";

import styles from './Collapse.module.scss'

export type CollapseProps = PropsDefaultWithChildren<{
    title: string
    initValue?: boolean
}>

export const Collapse: React.FC<CollapseProps> = ({
    className,
    title,
    initValue = false,
    children
}) => {
    const [isShow, setIsShow] = useState(initValue)

    return (
        <div className={className}>
            <div
                className={styles.header}
                onClick={() => {
                    setIsShow(prevState => !prevState)
                }}
            >
                <p>{title}</p>
                <Icon
                    className={clsx(
                        styles.icon,
                        {
                            [styles['is-active']]: isShow,
                        }
                    )}
                    name={'chevron'}
                    view={'placeholder'}
                    size={20}
                />
            </div>
            <TransitionExpand
                isShow={isShow}
            >
                <div className={styles.content}>
                    {children}
                </div>
            </TransitionExpand>
        </div>
    )
}