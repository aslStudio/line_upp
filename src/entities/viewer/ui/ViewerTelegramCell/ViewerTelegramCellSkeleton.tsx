import React from "react"

import {PropsDefault} from "@/shared/lib"

import styles from './ViewerTelegramCell.module.scss'
import {clsx} from "clsx";
import {images} from "@/shared/assets/images";
import {TextSkeleton} from "@/shared/ui/TextSkeleton";

export const ViewerTelegramCellSkeleton: React.FC<PropsDefault> = ({
    className
}) => (
    <div
        className={clsx(
            styles.root,
            className
        )}
    >
        <div className={styles.header}>
            <TextSkeleton
                className={styles.telegram}
                fontSize={15}
                lineHeight={22}
                view={'secondary'}
                widthRange={[0.5, 0.8]}
            />
            <img
                src={images.Viewer.Copy}
                alt={'copy'}
            />
        </div>
        <p className={styles.description}>Телеграм</p>
    </div>
)