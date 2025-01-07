import React, { useCallback } from "react"
import {useSelector} from "react-redux"

import { RootState } from "@/app/store.tsx"

import { usePatchSchedule } from "@/features/schedule/hooks";

import { PropsDefault } from "@/shared/lib"
import { Note } from "@/shared/ui/Note"

export const ScheduleNote: React.FC<PropsDefault> = ({
    className
}) => {
    const {
        schedule
    } = useSelector((state: RootState) => state.scheduleExpand);

    const {
        isLoading,
        patchSchedule
    } = usePatchSchedule()

    const onUpdate = useCallback(async (v: string) => {
        if (schedule) {
            await patchSchedule({
                id: schedule.id,
                note: v,
            })
        }
    }, [schedule])

    return (
        <Note
            className={className}
            initValue={schedule?.note ?? ''}
            onUpdateValue={onUpdate}
            isLoading={isLoading}
        />
    )
}