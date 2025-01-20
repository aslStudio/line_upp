import React from "react"
import {clsx} from "clsx"

import {PropsDefault} from "@/shared/lib"
import {useCopyToClipboard} from "@/shared/lib/hooks"
import {images} from "@/shared/assets/images"

import styles from './ViewerTelegramCell.module.scss'

export type ViewerTelegramCellProps = PropsDefault<{
    telegram: string
}>

export const ViewerTelegramCell: React.FC<ViewerTelegramCellProps> = ({
    className,
    telegram
}) => {
    const { copy } = useCopyToClipboard()

    return (
        <div
            className={clsx(
                styles.root,
                className
            )}
            onClick={() => {
                copy(telegram)
            }}
        >
            <div className={styles.header}>
                <p className={styles.telegram}>{telegram}</p>
                <img
                    src={images.Viewer.Copy}
                    alt={'copy'}
                />
            </div>
            <p className={styles.description}>Телеграм</p>
        </div>
    )
}