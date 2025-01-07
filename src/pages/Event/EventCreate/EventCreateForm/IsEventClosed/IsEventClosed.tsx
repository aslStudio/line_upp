import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {Cell} from "@/shared/ui/Cell"
import {Toggle} from "@/shared/ui/Toggle"

import styles from './IsEventClosed.module.scss'
import {createEventsModel} from "@/features/events/model";

export const IsEventClosed = () => {
    const {
        data
    } = useSelector((state: RootState) => state.createEvent)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <div className={styles.root}>
            <Cell
                title={'Закрытое событие'}
                description={'На событие будет нельзя подать заявку'}
            >
                <Toggle
                    value={data.isEventClosed}
                    setValue={isEventClosed => {
                        dispatch(createEventsModel.actions.update({isEventClosed}))
                    }}
                />
            </Cell>
        </div>
    )
}