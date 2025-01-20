import React from "react"
import {clsx} from "clsx"

import {PropsDefault} from "@/shared/lib"
import {TextSkeleton} from "@/shared/ui/TextSkeleton"

import styles from './ViewerCell.module.scss'

export const ViewerCellSkeleton: React.FC<PropsDefault> = ({
    className
}) => (
    <div
        className={clsx(
            styles.root,
            className,
        )}
    >
        <div className={styles.avatar} />
        <div className={styles.wrapper}>
            <TextSkeleton
                className={styles.title}
                fontSize={15}
                lineHeight={22}
                view={'secondary'}
                widthRange={[0.5, 0.7]}
            />
            <TextSkeleton
                className={styles.name}
                fontSize={13}
                lineHeight={18}
                view={'secondary'}
                widthRange={[0.5, 0.7]}
            />
        </div>
    </div>
)