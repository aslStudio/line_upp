import {useState} from "react"
import {useDispatch} from "react-redux"

import {AppDispatch} from "@/app/store.tsx"

import {NotificationSettings, notificationSettingsModel} from "@/entities/notification/model"

import {notificationApi} from "@/shared/api/notification"

export const useNotificationSettings = () => {
    const dispatch = useDispatch<AppDispatch>()

    const [isLoading, setIsLoading] = useState(false)

    async function updateNotificationSettings(
        p: Partial<NotificationSettings>
    ) {
        setIsLoading(true)
        await notificationApi.updateNotificationSettings(p)
        dispatch(notificationSettingsModel.actions.update(p))
        setIsLoading(false)
    }

    return {
        isLoading,
        updateNotificationSettings,
    }
}