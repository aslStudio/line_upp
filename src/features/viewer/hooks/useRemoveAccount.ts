import {useState} from "react"

import {viewerApi} from "@/shared/api/viewer"
import {tokenModel} from "@/shared/model";

export const useRemoveAccount = () => {
    const [isLoading, setIsLoading] = useState(false)

    async function remove() {
        setIsLoading(true)
        await viewerApi.removeAccount()
        tokenModel.clearTokens()
        setIsLoading(false)
    }

    return {
        isLoading,
        remove
    }
}