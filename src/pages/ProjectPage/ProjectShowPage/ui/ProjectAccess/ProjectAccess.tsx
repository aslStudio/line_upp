import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import {ProjectAccessType} from "@/shared/api/enum.ts";

import styles from './ProjectAccess.module.scss'

const projectMap: Record<ProjectAccessType, string> = {
    [ProjectAccessType.PERSONAL]: 'Только я',
    [ProjectAccessType.PUBLIC]: 'Для всех'
}

export const ProjectAccess = () => {
    const {
        project
    } = useSelector((state: RootState) => state.projectExpand)

    return (
        <div className={styles.root}>
            <p className={styles.title}>Доступ</p>
            <p className={styles.description}>Участники будут видеть только свои события и только организаторов среди участников</p>
            <p className={styles.cell}>{project ? projectMap[project.access] : ''}</p>
        </div>
    )
}