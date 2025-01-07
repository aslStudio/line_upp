import styles from './EventCreateRepeat.module.scss'
import {Input} from "@/shared/ui/fields/Input";
import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/store.tsx";
import {Select} from "@/shared/ui/Select";
import {RepeatType} from "@/shared/api/enum.ts";
import {clsx} from "clsx";
import {Button} from "@/shared/ui/Button";
import {createEventsModel} from "@/features/events/model";
import {useProjectNavigate} from "@/shared/lib/hooks";

const selectData = [
    {
        id: RepeatType.WEEK,
        text: 'Неделя'
    },
    {
        id: RepeatType.DAY,
        text: 'День'
    }
]

const daysNames = [
    {
        id: 0,
        text: 'вс',
    },
    {
        id: 1,
        text: 'пн',
    },
    {
        id: 2,
        text: 'вт',
    },
    {
        id: 3,
        text: 'ср',
    },
    {
        id: 4,
        text: 'чт',
    },
    {
        id: 5,
        text: 'пт',
    },
    {
        id: 6,
        text: 'сб',
    }
]

export const EventCreateRepeat = () => {
    const {
        goBack
    } = useProjectNavigate()

    const {
        data
    } = useSelector((state: RootState) => state.createEvent)
    const dispatch = useDispatch<AppDispatch>()

    const [value, setValue] = useState(0)
    const [type, setType] = useState<RepeatType>(RepeatType.WEEK)
    const [days, setDays] = useState<number[]>([])

    const onClick = useCallback(() => {
        dispatch(createEventsModel.actions.update({
            repeat: {
                type,
                value,
                days,
            }
        }))
        goBack()
    }, [dispatch, type, value, days, goBack])

    const onSelectDay = useCallback((id: number) => {
        if (days.includes(id)) {
            setDays(prevState => {
                return prevState.filter(item => item !== id)
            })
        } else {
            setDays(prevState => [
                ...prevState,
                id,
            ])
        }
    }, [days])

    useEffect(() => {
        setValue(data.repeat.value)
        setType(data.repeat.type)
        setDays(data.repeat.days)
    }, [data.repeat])

    return (
        <div className={styles.root}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>
                    Повторение
                </h1>
                <div className={styles.field}>
                    <p className={styles.label}>Повторять каждые</p>
                    <div className={styles.inner}>
                        <Input
                            className={styles.input}
                            mask={'number'}
                            value={`${value}`}
                            setValue={v => setValue(Number(v))}
                        />
                        <Select
                            value={type}
                            data={selectData}
                            setValue={v => setType(v as RepeatType)}
                        />
                    </div>
                </div>
                <div className={styles.field}>
                    <p className={styles.label}>Повторять каждые</p>
                    <div className={styles.days}>
                        {daysNames.map(item => (
                            <button
                                className={clsx(
                                    styles['day-value'],
                                    {
                                        [styles['is-active']]: days.includes(item.id)
                                    }
                                )}
                                onClick={() => onSelectDay(item.id)}
                            >
                                {item.text}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <Button onClick={onClick}>
                Сохранить
            </Button>
        </div>
    )
}