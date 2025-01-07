import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {createEventsModel} from "@/features/events/model"

import { ColorSelectSingle } from "@/entities/color/ui"

import styles from './EventColor.module.scss'
import {TransitionFade} from "@/shared/ui/TransitionFade";

export const EventColor = () => {
    const {
        data, errors
    } = useSelector((state: RootState) => state.createEvent)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <div>
            <div className={styles.root}>
                <ColorSelectSingle
                    value={data.color}
                    setValue={color => {
                        dispatch(createEventsModel.actions.update({color}))
                    }}
                />
            </div>
            <TransitionFade>
                {errors.color && (
                    <p className={styles.error}>Укажите цвет события</p>
                )}
            </TransitionFade>
        </div>
    )
}