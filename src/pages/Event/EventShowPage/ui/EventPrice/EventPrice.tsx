import {useMemo} from "react"
import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import {toFormattedNumber} from "@/shared/lib/number.ts"

import styles from './EventPrice.module.scss'

export const EventPrice = () => {
    const {
        event
    } = useSelector((state: RootState) => state.eventExpand)

    const price = useMemo(() =>{
        if (event) {
            return `${toFormattedNumber(event.price)} ₽`
        }

        return ''
    }, [event])

    if (price) {
        return (
            <div className={styles.root}>
                <p className={styles.title}>Оплата</p>
                <p className={styles.price}>{price}</p>
            </div>
        )
    }

    return null
}