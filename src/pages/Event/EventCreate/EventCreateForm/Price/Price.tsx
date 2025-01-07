import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {createEventsModel} from "@/features/events/model"

import {Input} from "@/shared/ui/fields/Input"

import styles from './Price.module.scss'

export const Price = () => {
    const {
        data
    } = useSelector((state: RootState) => state.createEvent)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <div className={styles.root}>
            <p className={styles.title}>Оплата</p>
            <Input
                value={`${data.price}`}
                mask={'price'}
                after={'₽'}
                setValue={v => {
                    dispatch(createEventsModel.actions.update({
                        price: Number(v)
                    }))
                }}
            />
        </div>
    )
}