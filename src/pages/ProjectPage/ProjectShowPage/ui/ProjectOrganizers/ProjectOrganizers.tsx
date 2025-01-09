import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import {UserCell, UserCellList} from "@/entities/user/ui"

import styles from './ProjectOrganizers.module.scss'

export const ProjectOrganizers = () => {
    const {
        project
    } = useSelector((state: RootState) => state.projectExpand)

    return (
        <UserCellList
            className={styles.root}
            withBorder={true}
            title={'Организатор'}
            description={'Создатель расписания'}
            render={item => (
                <UserCell
                    key={item.id}
                    {...item}
                />
            )}
            list={project?.organizers ?? []}
        />
    )
}