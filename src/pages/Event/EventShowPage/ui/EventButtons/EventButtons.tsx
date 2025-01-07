import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {Button} from "@/shared/ui/Button"
import {OrderStatus} from "@/shared/api/enum.ts"

import styles from './EventButtons.module.scss'
import {useProjectNavigate} from "@/shared/lib/hooks";
import {createEventsModel} from "@/features/events/model";
import {CreateEventPaths, EventsPaths, RootPaths} from "@/shared/lib";

export const EventButtons = () => {
    const { navigate } = useProjectNavigate()

    const {
        event
    } = useSelector((state: RootState) => state.eventExpand);
    const dispatch = useDispatch<AppDispatch>()

    if (!event) return null

    if (event.isOrganizer) {
        return (
            <Button
                view={'brand'}
                size={'m'}
                onClick={() => {
                    dispatch(createEventsModel.actions.init(event))
                    navigate(
                        RootPaths.EVENTS,
                        EventsPaths.CREATE,
                        CreateEventPaths.FORM,
                    )
                }}
            >
                Отредактировать
            </Button>
        )
    }

    if ([
        OrderStatus.PROCESSING,
        OrderStatus.APPROVED,
    ].includes(event.orderStatus)) {
        return (
            <Button
                view={'critical-flat'}
                size={'m'}
                onClick={() => {}}
            >
                Отказаться
            </Button>
        )
    }

    if ([
        OrderStatus.THERE_ARE_ORDERS,
        OrderStatus.THERE_NOT_ORDERS
    ].includes(event.orderStatus)) {
        return (
            <Button
                view={'brand'}
                size={'m'}
                onClick={() => {}}
            >
                Отправить заявку
            </Button>
        )
    }

    if ([
        OrderStatus.SUBMIT_PARTICIPANT,
        OrderStatus.APPROVED_SUBMIT_PARTICIPANT,
    ].includes(event.orderStatus)) {
        return (
            <div className={styles.wrapper}>
                <Button
                    view={'brand'}
                    size={'m'}
                    onClick={() => {}}
                >
                    Подтвердить участие
                </Button>
                <Button
                    view={'critical-flat'}
                    size={'m'}
                    onClick={() => {}}
                >
                    Отказаться
                </Button>
            </div>
        )
    }

    if ([
        OrderStatus.INVITED
    ].includes(event.orderStatus)) {
        return (
            <div className={styles.wrapper}>
                <Button
                    view={'brand'}
                    size={'m'}
                    onClick={() => {}}
                >
                    Принять
                </Button>
                <Button
                    view={'critical-flat'}
                    size={'m'}
                    onClick={() => {}}
                >
                    Отказаться
                </Button>
            </div>
        )
    }

    return null
}