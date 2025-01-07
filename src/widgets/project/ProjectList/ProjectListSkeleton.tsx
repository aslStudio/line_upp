import React from "react"

import {PropsDefault} from "@/shared/lib"
import {Icon} from "@/shared/ui/Icon"

import styles from './ProjectList.module.scss'
import {TextSkeleton} from "@/shared/ui/TextSkeleton";

export type ProjectListSkeletonProps = PropsDefault<{
    title: string
}>

export const ProjectListSkeleton: React.FC<ProjectListSkeletonProps> = ({
    className,
    title,
}) => {
    return (
        <div className={className}>
            <p className={styles.title}>{title}</p>
            {Array(5).fill(1).map(() => (
                <div className={styles.cell}>
                    <button
                        className={styles['cell-title']}
                    >
                        <TextSkeleton
                            fontSize={20}
                            lineHeight={28}
                            view={'secondary'}
                            widthRange={[0.5, 0.8]}
                        />
                    </button>
                    <button
                        className={styles['cell-info']}
                    >
                        <Icon
                            name={'info'}
                            view={'brand'}
                            size={16}
                        />
                    </button>
                </div>
            ))}
        </div>
    )
}