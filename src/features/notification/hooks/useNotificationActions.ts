import {useState} from "react"
import {notificationApi} from "@/shared/api/notification";
import {Notification} from "@/shared/kernel.ts";

export const useNotificationActions = () => {
    const [isArchiving, setIsArchiving] = useState(false)

    async function archive(notification: Notification) {
        setIsArchiving(true)
        await notificationApi.archiveNotification({
            id: notification.id
        })
        setIsArchiving(false)
    }

    async function approve(notification: Notification) {
        await notificationApi.approveParticipation({
            id: notification.id
        })
    }

    async function reject(notification: Notification) {
        await notificationApi.rejectParticipation({
            id: notification.id
        })
    }

    async function submit(notification: Notification) {
        await notificationApi.submitParticipation({
            id: notification.id
        })
    }

    async function send(notification: Notification) {
        await notificationApi.sendParticipation({
            id: notification.id
        })
    }

    return {
        isArchiving,

        archive,
        approve,
        reject,
        submit,
        send,
    }
}