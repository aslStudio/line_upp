import {useMemo} from "react"
import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import {InfoCell} from "@/shared/ui/InfoCell"
import {
    getDayFromTS, getDayShortcut,
    getMonthShortcut,
    getRelativeMonth, getRepeatTypeText,
    getTimeDiff,
    getTimeRange,
    toTime,
    tsToDayName
} from "@/shared/lib/date.ts"
import {Icon} from "@/shared/ui/Icon"

import styles from './EventLocation.module.scss'

export const EventLocation = () => {
    return (
        <div className={styles.root}>
            <p className={styles.title}>Место и время</p>
            <div className={styles.wrapper}>
                <DateCell />
                <RepeatCell />
                <AddressCell />
            </div>
        </div>
    )
}

const DateCell = () => {
    const {
        event
    } = useSelector((state: RootState) => state.eventExpand)

    const title = useMemo(() => {
        if (event) {
            const day = tsToDayName(event.date.start)
            const date = getDayFromTS(event.date.start)
            const month = getRelativeMonth(event.date.start)

            return `${day}, ${date} ${month}`
        }

        return ''
    }, [])

    const description = useMemo(() => {
        if (event) {
            const timeRange = getTimeRange(
                event.date.start,
                event.date.end,
            )
            const timeDiff = getTimeDiff(
                event.date.start,
                event.date.end,
            )
            const {
                days,
                hours,
                minutes
            } = toTime(timeDiff)

            if (days > 0) {
                return `${timeRange}, ${days} дней ${hours} часов ${minutes} минут`
            }

            if (hours > 0) {
                return `${timeRange}, ${hours} часов ${minutes} минут`
            }

            return `${timeRange}, ${minutes} минут`
        }

        return ''
    }, [])

    return (
        <div className={styles['date-root']}>
            <div className={styles['date-cell']}>
                <p
                    className={styles['date-cell-month']}
                >
                    {getMonthShortcut(event?.date.start ?? 0)}
                </p>
                <p
                    className={styles['date-cell-date']}
                >
                    {getDayFromTS(event?.date.start ?? 0)}
                </p>
            </div>
            <InfoCell
                title={title}
                description={description}
            />
        </div>
    )
}

const RepeatCell = () => {
    const {
        event
    } = useSelector((state: RootState) => state.eventExpand)

    const description = useMemo(() => {
        if (event) {
            const shortcuts = event.repeat.days.map(getDayShortcut)
            const days = shortcuts.join(', ')
            const repeatType = getRepeatTypeText(
                event.repeat.type,
                event.repeat.value
            )

            return `${days} - каждые ${event.repeat.value} ${repeatType}`
        }

        return ''
    }, [event])

    return (
        <div className={styles['repeat-cell']}>
            <InfoCell
                title={'Повторение'}
                description={description}
            />
        </div>
    )
}

const AddressCell = () => {
    const {
        event
    } = useSelector((state: RootState) => state.eventExpand)

    const title = useMemo(() => {
        if (event) {
            return `${event.address.street}, ${event.address.house}`
        }

        return  ''
    }, [event])

    const description = useMemo(() => {
        if (event) {
            return `г. ${event.address.city}`
        }

        return  ''
    }, [event])

    return (
        <div className={styles['address-cell']}>
            <div className={styles['address-cell-icon']}>
                <Icon
                    name={'location'}
                    size={24}
                    view={'placeholder'}
                />
            </div>
            <InfoCell
                title={title}
                description={description}
            />
        </div>
    )
}