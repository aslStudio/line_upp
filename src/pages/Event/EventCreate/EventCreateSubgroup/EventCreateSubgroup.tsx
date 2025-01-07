import {useCallback, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {createEventsModel} from "@/features/events/model"

import { projectsListModel} from "@/entities/projects/model"

import {ButtonCell} from "@/shared/ui/ButtonCell"
import {CellList} from "@/shared/ui/CellList"
import {useProjectNavigate} from "@/shared/lib/hooks"

import styles from './EventCreateSubgroup.module.scss'

export const EventCreateSubgroup = () => {
    const { goBack } = useProjectNavigate()
    const {
        data: { project }
    } = useSelector((state: RootState) => state.createEvent)
    const dispatch = useDispatch<AppDispatch>()

    const onSelect = useCallback((v: number | string) => {
        const active = project!.subgroups.find(item => item.id === v)

        if (active) {
            dispatch(createEventsModel.actions.update({
                subgroup: active,
            }))
            goBack()
        }
    }, [project, goBack])

    useEffect(() => {
        dispatch(projectsListModel.thunks.getProjectsThunk())
    }, [])

    return (
        <div>
            <ButtonCell
                className={styles.button}
                iconStyles={{
                    transform: 'rotate(45deg)',
                }}
                withHorizontalPadding={true}
                icon={'cross-icon'}
                onClick={() => {}}
            >
                Создать подгруппу
            </ButtonCell>
            {project && (
                <CellList
                    label={'Последние подгруппы'}
                    data={project.subgroups}
                    onClick={onSelect}
                />
            )}
        </div>
    )
}