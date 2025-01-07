import {useCallback, useEffect, useState} from "react"

import {Calendar} from "@/shared/ui/Calendar"
import {TimeStamp} from "@/shared/lib"

import styles from './EventCreateCalendar.module.scss'
import {InputTime} from "@/shared/ui/fields/InputTime";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/store.tsx";
import {Button} from "@/shared/ui/Button";
import {createEventsModel} from "@/features/events/model";
import {useProjectNavigate} from "@/shared/lib/hooks";

export const EventCreateCalendar = () => {
    const {
        goBack
    } = useProjectNavigate()

    const {
        data
    } = useSelector((state: RootState) => state.createEvent)
    const dispatch = useDispatch<AppDispatch>()

    const [value, setValue] = useState<TimeStamp>(new Date().getTime())

    const onClick = useCallback(() => {
        dispatch(createEventsModel.actions.update({
            startDate: value
        }))
        goBack()
    }, [value])

    useEffect(() => {
        setValue(data.startDate)
    }, [data.startDate])

    return (
        <div className={styles.root}>
            <div>
                <Calendar
                    value={value}
                    setValue={setValue}
                />
                <div className={styles.row}>
                    <p>Время</p>
                    <InputTime
                        type={'HH:MM'}
                        value={value}
                        setValue={setValue}
                    />
                </div>
            </div>
            <Button onClick={onClick}>
                Сохранить
            </Button>
        </div>
    )
}