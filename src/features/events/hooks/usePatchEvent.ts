import {useState} from "react";
import {Event} from "@/entities/events/model";
import {eventsApi} from "@/shared/api/events";

export const usePatchEvent = () => {
    const [isLoading, setIsLoading] = useState(false)

    async function patchEvent({
        id,
        isFavorite,
        note,
    }: {
        id: Event['id'],
        isFavorite?: boolean
        note?: string
    }) {
        setIsLoading(true)

        await eventsApi.patchEvent({
            id,
            isFavorite,
            note,
        })

        setIsLoading(false)
    }

    return {
        isLoading,
        patchEvent,
    }
}