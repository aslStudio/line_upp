import {useCallback, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {createProjectModel, isError, validateProject} from "@/features/project/model"
import {useRemoveProject} from "@/features/project/hooks"

import {useProjectNavigate} from "@/shared/lib/hooks"
import {Button} from "@/shared/ui/Button"
import {CalendarPaths, RootPaths} from "@/shared/lib"

import styles from './Buttons.module.scss'

export const Buttons = () => {
    const { navigate } = useProjectNavigate()

    const {
        data,
        creatingState,
        updatingState
    } = useSelector((state: RootState) => state.createProject)
    const dispatch = useDispatch<AppDispatch>()
    const {
        isLoading,
        remove,
    } = useRemoveProject()

    const onCreate = useCallback(() => {
        const errors = validateProject(data)
        if (isError(errors)) {
            dispatch(createProjectModel.actions.setErrors(errors))
        } else {
            dispatch(createProjectModel.thunks.createProjectThunk({
                ...data,
                participants: data.participants.map(item => item.id),
                organizers: data.organizers.map(item => ({
                    id: item.id,
                    isCreator: item.isCreator
                }))
            }))
        }
    }, [data])

    const onUpdate = useCallback(() => {
        const errors = validateProject(data)
        if (isError(errors)) {
            dispatch(createProjectModel.actions.setErrors(errors))
        } else {
            if (data.id) {
                dispatch(createProjectModel.thunks.updateProjectThunk({
                    ...data,
                    id: data.id!,
                    participants: data.participants.map(item => item.id),
                    invited: data.invited.map(item => item.id),
                    organizers: data.organizers.map(item => ({
                        id: item.id,
                        isCreator: item.isCreator
                    }))
                }))
            }
        }
    }, [data])

    const onRemove = useCallback(async () => {
        if (data.id) {
            await remove(data.id)
            navigate(
                RootPaths.PROJECT_CALENDAR,
                CalendarPaths.WEEK,
            )
        }
    }, [navigate])

    useEffect(() => {
        if (creatingState === 'success') {
            dispatch(createProjectModel.actions.reset())
            navigate(
                RootPaths.PROJECT_CALENDAR,
                CalendarPaths.WEEK,
            )
        }
    }, [creatingState, navigate]);

    useEffect(() => {
        if (updatingState === 'success') {
            dispatch(createProjectModel.actions.reset())
            navigate(
                RootPaths.PROJECT_CALENDAR,
                CalendarPaths.WEEK,
            )
        }
    }, [navigate, updatingState]);

    if (data.id) {
        return (
            <div className={styles.root}>
                <Button
                    isLoading={updatingState === 'pending'}
                    onClick={onUpdate}
                >
                    Сохранить
                </Button>
                <Button
                    isLoading={isLoading}
                    view={'critical-flat'}
                    onClick={onRemove}
                >
                    Удалить
                </Button>
            </div>
        )
    }

    return (
        <div className={styles.root}>
            <Button
                isLoading={creatingState === 'pending'}
                onClick={onCreate}
            >
                Создать
            </Button>
        </div>
    )
}