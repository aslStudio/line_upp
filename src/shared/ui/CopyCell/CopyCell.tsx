import React from "react"

import {PropsDefault} from "@/shared/lib"
import {Icon} from "@/shared/ui/Icon"

import styles from './CopyCell.module.scss'
import {clsx} from "clsx";
import {useCopyToClipboard} from "@/shared/lib/hooks";

export type CopyCellProps = PropsDefault<{
    value: string
}>

export const CopyCell: React.FC<CopyCellProps> = ({
    className,
    value,
}) => {
    const { copy } = useCopyToClipboard()

    return (
        <button
            className={clsx(
                styles.root,
                className,
            )}
            onClick={() => {
                copy(value)
            }}
        >
            <p>{value}</p>
            <Icon
                name={'copy'}
                view={'brand'}
                size={24}
            />
        </button>
    )
}