import React from "react"
import {useDispatch} from "react-redux"

import {AppDispatch} from "@/app/store.tsx"

import {createEventsModel} from "@/features/events/model"

import {EventType} from "@/shared/api/enum.ts"
import {useProjectNavigate} from "@/shared/lib/hooks"
import {CreateEventPaths, EventsPaths, RootPaths} from "@/shared/lib"

import styles from './EventCreateType.module.scss'

export const EventCreateType = () => {
    const {
        navigate
    } = useProjectNavigate()

    const dispatch = useDispatch<AppDispatch>()

    return (
        <div className={styles.root}>
            <h1 className={styles.title}>
                Выберите тип события
            </h1>
            <TypeButton
                title={'Общее событие'}
                description={'В это событие вы сможете приглашать участников и принимать их заявки.  Сбор заявок можно приостанавливать'}
                onClick={() => {
                    dispatch(createEventsModel.actions.update({
                        type: EventType.OPENED,
                    }))
                    navigate(
                        RootPaths.EVENTS,
                        EventsPaths.CREATE,
                        CreateEventPaths.FORM,
                    )
                }}
            />
            <TypeButton
                title={'Личное событие'}
                description={'В этом событии можете быть только вы'}
                onClick={() => {
                    dispatch(createEventsModel.actions.update({
                        type: EventType.PERSONAL,
                    }))
                    navigate(
                        RootPaths.EVENTS,
                        EventsPaths.CREATE,
                        CreateEventPaths.FORM,
                    )
                }}
            />
        </div>
    )
}

const TypeButton: React.FC<{
    title: string
    description: string
    onClick: () => void
}> = ({
    title,
    description,
    onClick
}) => (
    <button
        className={styles.button}
        onClick={onClick}
    >
        <p
            className={styles['button-title']}
        >{title}</p>
        <p
            className={styles['button-description']}
        >{description}</p>
    </button>
)