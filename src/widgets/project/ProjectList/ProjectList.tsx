import React from "react"

import {Project} from "@/entities/projects/model"
import {Schedule} from "@/entities/schedule/model"

import {PropsDefault} from "@/shared/lib"
import {Icon} from "@/shared/ui/Icon"

import styles from './ProjectList.module.scss'

export type ProjectListProps = PropsDefault<{
    title: string
    list: (Project | Schedule)[]
    onSelected: (project: Project | Schedule) => void
    onInfo: (project: Project | Schedule) => void
}>

export const ProjectList: React.FC<ProjectListProps> = ({
    className,
    title,
    list,
    onSelected,
    onInfo
}) => {
    return (
        <div className={className}>
            <p className={styles.title}>{title}</p>
            {list.map(project => (
                <div
                    key={project.id}
                    className={styles.cell}
                >
                    <button
                        className={styles['cell-title']}
                        onClick={() => {
                            onSelected(project)
                        }}
                    >
                        {project.name}
                    </button>
                    <button
                        className={styles['cell-info']}
                        onClick={() => {
                            onInfo(project)
                        }}
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