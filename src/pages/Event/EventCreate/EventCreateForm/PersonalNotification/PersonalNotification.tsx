import {Cell} from "@/shared/ui/Cell";
import {Toggle} from "@/shared/ui/Toggle";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/store.tsx";
import {createEventsModel} from "@/features/events/model";

export const PersonalNotification = () => {
    const {
        data
    } = useSelector((state: RootState) => state.createEvent)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <div>
            <Cell
                title={'Личное напоминание'}
                description={'Будут приходить только вам'}
                size={'l'}
            >
                <Toggle
                    value={data.isPersonalNotification}
                    setValue={isPersonalNotification => {
                        dispatch(createEventsModel.actions.update({isPersonalNotification}))
                    }}
                />
            </Cell>
        </div>
    )
}