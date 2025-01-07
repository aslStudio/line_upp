import {useCallback, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {createEventsModel} from "@/features/events/model"

import { projectsListModel} from "@/entities/projects/model"

import {ButtonCell} from "@/shared/ui/ButtonCell"
import {CellList} from "@/shared/ui/CellList"
import {TransitionFade} from "@/shared/ui/TransitionFade"
import {Loader} from "@/shared/ui/Loader"
import {useProjectNavigate} from "@/shared/lib/hooks"

import styles from './EventCreateProject.module.scss'

export const EventCreateProject = () => {
    const { goBack } = useProjectNavigate()

    const {
        isPending,
        data,
    } = useSelector((state: RootState) => state.projectList)
    const dispatch = useDispatch<AppDispatch>()

    const onSelect = useCallback((v: number | string) => {
        const active = data.find(item => item.id === v)

        if (active) {
            dispatch(createEventsModel.actions.update({
                project: active,
            }))
            goBack()
        }
    }, [data, goBack])

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
                Добавить проект
            </ButtonCell>
            <TransitionFade>
                {isPending && (
                    <div className={styles.loader}>
                        <Loader />
                    </div>
                )}
                {!isPending && (
                    <CellList
                        label={'Последние проекты'}
                        data={data}
                        onClick={onSelect}
                    />
                )}
            </TransitionFade>
        </div>
    )
}