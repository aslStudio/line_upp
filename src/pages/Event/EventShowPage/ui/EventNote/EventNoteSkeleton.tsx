import React from "react"
import {clsx} from "clsx"

import {PropsDefault} from "@/shared/lib"

import styles from './EventNote.module.scss'
import {TextSkeleton} from "@/shared/ui/TextSkeleton";

export const EventNoteSkeleton: React.FC<PropsDefault> = ({
    className
}) => {
    return (
        <div
            className={clsx(
                className,
                styles.root
            )}
        >
            <div className={styles.header}>
                <p>Ваша заметка</p>
            </div>
            <div>
                <TextSkeleton
                    fontSize={15}
                    lineHeight={20}
                    view={'secondary'}
                    widthRange={[0.4, 0.9]}
                />
                <TextSkeleton
                    fontSize={15}
                    lineHeight={20}
                    view={'secondary'}
                    widthRange={[0.4, 0.9]}
                />
                <TextSkeleton
                    fontSize={15}
                    lineHeight={20}
                    view={'secondary'}
                    widthRange={[0.4, 0.9]}
                />
            </div>
        </div>
    )
}