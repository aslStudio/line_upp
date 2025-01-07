import {useLocation} from "react-router-dom"
import {Tabs} from "@/shared/ui/Tabs";
import {CalendarPaths} from "@/shared/lib";
import {useCallback, useMemo} from "react";
import {useProjectNavigate} from "@/shared/lib/hooks";

const data = [
    {
        id: CalendarPaths.WEEK,
        text: 'Неделя'
    },
    {
        id: CalendarPaths.MONTH,
        text: 'Месяц'
    },
]

export const CalendarTypeTabs = () => {
    const location = useLocation()
    const { navigate } = useProjectNavigate()

    const value = useMemo(() => {
        if (location.pathname.includes(CalendarPaths.WEEK)) {
            return CalendarPaths.WEEK
        }

        return CalendarPaths.MONTH
    }, [location])

    const onChangeType = useCallback((v: CalendarPaths) => {
        if (v === CalendarPaths.MONTH) {
            navigate(location.pathname.replace(CalendarPaths.WEEK, CalendarPaths.MONTH))
            return
        }

        navigate(location.pathname.replace(CalendarPaths.MONTH, CalendarPaths.WEEK))
    }, [location])

    return (
        <Tabs
            value={value}
            data={data}
            setValue={v => onChangeType(v as CalendarPaths)}
        />
    )
}