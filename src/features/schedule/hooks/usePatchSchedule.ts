import {useState} from "react";
import {Schedule} from "@/entities/schedule/model";
import {scheduleApi} from "@/shared/api/schedule";

export const usePatchSchedule = () => {
    const [isLoading, setIsLoading] = useState(false)

    async function patchSchedule({
        id,
        note
    }: {
        id: Schedule['id']
        note?: string
    }) {
        setIsLoading(true)

        await scheduleApi.patchSchedule({
            id,
            note,
        })

        setIsLoading(false)
    }

    return {
        isLoading,
        patchSchedule,
    }
}