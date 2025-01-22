import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {Button} from "@/shared/ui/Button"

import styles from './Buttons.module.scss'
import {useCallback, useEffect} from "react";
import {createEventsModel, isError, validateEvent} from "@/features/events/model";
import {useProjectNavigate} from "@/shared/lib/hooks";
import {CalendarPaths, RootPaths} from "@/shared/lib";

export const Buttons = () => {
    const { navigate } = useProjectNavigate()

    const {
        data,
        creatingState,
        updatingState,
        deletingState,
    } = useSelector((state: RootState) => state.createEvent)
    const dispatch = useDispatch<AppDispatch>()

    const onCreate = useCallback(() => {
        const errors = validateEvent(data)
        if (isError(errors)) {
            dispatch(createEventsModel.actions.setErrors(errors))
        } else {
            dispatch(createEventsModel.thunks.createThunk({
                ...data,
                color: data.color!.id,
                project: data.project!.id,
                subgroup: data.subgroup ? data.subgroup.id : null,
                address: data.address!
            }))
        }
    }, [data])

    const onUpdate = useCallback(() => {
        const errors = validateEvent(data)
        if (isError(errors)) {
            dispatch(createEventsModel.actions.setErrors(errors))
        } else {
            dispatch(createEventsModel.thunks.updateThunk({
                ...data,
                color: data.color!.id,
                project: data.project!.id,
                subgroup: data.subgroup!.id,
                address: data.address!
            }))
        }
    }, [data])

    const onDelete = useCallback(() => {
        if (data.id) {
            dispatch(createEventsModel.thunks.deleteThunk({
                id: data.id
            }))
        }
    }, [data])

    useEffect(() => {
        if (creatingState === 'success') {
            dispatch(createEventsModel.actions.reset())
            navigate(
                RootPaths.CALENDAR,
                CalendarPaths.WEEK,
            )
        }
    }, [creatingState, navigate]);

    useEffect(() => {
        if (updatingState === 'success') {
            dispatch(createEventsModel.actions.reset())
            navigate(
                RootPaths.CALENDAR,
                CalendarPaths.WEEK,
            )
        }
    }, [navigate, updatingState]);

    useEffect(() => {
        if (deletingState === 'success') {
            dispatch(createEventsModel.actions.reset())
            navigate(
                RootPaths.CALENDAR,
                CalendarPaths.WEEK,
            )
        }
    }, [deletingState, navigate]);

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
                    isLoading={deletingState === 'pending'}
                    view={'critical-flat'}
                    onClick={onDelete}
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