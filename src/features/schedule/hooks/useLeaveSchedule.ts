import {useState} from "react"

import {Schedule} from "@/entities/schedule/model"

import {scheduleApi} from "@/shared/api/schedule"

export const useLeaveSchedule = () => {
    const [isLoading, setIsLoading] = useState(false)

    async function leave(
        id: Schedule['id'],
        cb?: () => void
    ) {
        setIsLoading(true)

        await scheduleApi.leaveSchedule({ id: id })
        cb?.()

        setIsLoading(false)
    }

    return {
        isLoading,
        leave,
    }
}