import {useState} from "react"

import {RejectOrderParams, SubmitOrderParams} from "@/shared/api/events/types"
import {eventsApi} from "@/shared/api/events"

export const useChangeOrderStatus = () => {
    const [isLoading, setIsLoading] = useState(false)

    async function submitOrder(params: SubmitOrderParams): Promise<void> {
        setIsLoading(true)
        await eventsApi.submitOrder(params)
        setIsLoading(false)
    }

    async function rejectOrder(params: RejectOrderParams): Promise<void> {
        setIsLoading(true)
        await eventsApi.rejectOrder(params)
        setIsLoading(false)
    }

    return {
        isLoading,
        submitOrder,
        rejectOrder,
    }
}