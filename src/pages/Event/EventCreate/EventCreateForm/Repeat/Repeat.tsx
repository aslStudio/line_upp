import {useMemo} from "react"
import { useSelector} from "react-redux"

import { RootState} from "@/app/store.tsx"

import {Icon} from "@/shared/ui/Icon"
import {useProjectNavigate} from "@/shared/lib/hooks"
import {RepeatType} from "@/shared/api/enum.ts";
import {getDayShortcutByIndex} from "@/shared/lib/date.ts";

import styles from './Repeat.module.scss'
import {CreateEventPaths, EventsPaths, RootPaths} from "@/shared/lib";

const repeatTypeMap: Record<RepeatType, string> = {
    [RepeatType.DAY]: 'Ежедневно',
    [RepeatType.WEEK]: 'Еженедельно'
}

const repeatTypeRelativeMap: Record<RepeatType, string> = {
    [RepeatType.DAY]: 'каждые _ дня',
    [RepeatType.WEEK]: 'каждые _ недели'
}

const repeatTypeRelativeMultiMap: Record<RepeatType, string> = {
    [RepeatType.DAY]: 'каждые _ дней',
    [RepeatType.WEEK]: 'каждые _ недель'
}

export const Repeat = () => {
    const {
        navigate
    } = useProjectNavigate()

    const {
        data
    } = useSelector((state: RootState) => state.createEvent)

    const badgeContent = useMemo(() => {
        if (data.repeat.value) {
            const days = data.repeat.days.map(getDayShortcutByIndex).join(', ')

            if (data.repeat.value === 1) {
                return `${repeatTypeMap[data.repeat.type]} в ` + days
            }

            if (data.repeat.value < 5) {
                return `${repeatTypeRelativeMap[data.repeat.type].replace('_', `${data.repeat.value}`)} в ` + days
            }

            return `${repeatTypeRelativeMultiMap[data.repeat.type].replace('_', `${data.repeat.value}`)} в ` + days
        }

        return 'Без повторений'
    }, [data.repeat])

    return (
        <div
            className={styles.root}
            onClick={() => {
                navigate(
                    RootPaths.EVENTS,
                    EventsPaths.CREATE,
                    CreateEventPaths.REPEAT,
                )
            }}
        >
            <div className={styles.wrapper}>
                <p>Повторение</p>
                <div>
                    {badgeContent}
                </div>
            </div>
            <Icon
                className={styles.icon}
                name={'chevron'}
                size={22}
                view={'gray'}
            />
        </div>
    )
}