import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {createEventsModel} from "@/features/events/model"

import {Cell} from "@/shared/ui/Cell"
import {Toggle} from "@/shared/ui/Toggle"

export const IsOwl = () => {
    const {
        data
    } = useSelector((state: RootState) => state.createEvent)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <Cell
            title={'Режим “Сова”'}
            description={'События в интервале 00:00-10:00  не будут переносится на следующий день'}
        >
            <Toggle
                value={data.isOwl}
                setValue={isOwl => {
                    dispatch(createEventsModel.actions.update({ isOwl }))
                }}
            />
        </Cell>
    )
}