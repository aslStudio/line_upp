import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import {InfoSection} from "@/shared/ui/InfoSection";

export const ScheduleComment = () => {
    const {
        schedule
    } = useSelector((state: RootState) => state.scheduleExpand)

    if (schedule?.comment) {
        return (
            <InfoSection
                label={'Комментарий организатора'}
                text={schedule?.comment ?? ''}
            />
        )
    }

    return null
}