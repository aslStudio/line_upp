import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {Radio} from "@/shared/ui/Radio"
import {ProjectAccessType} from "@/shared/api/enum.ts"
import {createProjectModel} from "@/features/project/model"

import styles from './Access.module.scss'

export const Access = () => {
    const { data } = useSelector((state: RootState) => state.createProject)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <div className={styles.root}>
            <p className={styles.title}>Доступ</p>
            <p className={styles.description}>Участники будут видеть все события и всех участников</p>
            <Radio
                className={styles.radio}
                view={'blue'}
                value={data.access === ProjectAccessType.PUBLIC}
                setValue={() => {
                    dispatch(createProjectModel.actions.update({
                        access: ProjectAccessType.PUBLIC
                    }))
                }}
            >
                Для всех
            </Radio>
            <Radio
                className={styles.radio}
                view={'blue'}
                value={data.access === ProjectAccessType.PERSONAL}
                setValue={() => {
                    dispatch(createProjectModel.actions.update({
                        access: ProjectAccessType.PERSONAL
                    }))
                }}
            >
                Только я
            </Radio>
        </div>
    )
}
