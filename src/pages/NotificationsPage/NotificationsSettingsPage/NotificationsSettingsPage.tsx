import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {clsx} from "clsx"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {NotificationSettings, notificationSettingsModel} from "@/entities/notification/model"
import {useNotificationSettings} from "@/entities/notification/hooks/useNotificationSettings.ts"

import {TransitionFade} from "@/shared/ui/TransitionFade"
import {Loader} from "@/shared/ui/Loader"
import {Toggle} from "@/shared/ui/Toggle"

import {
    notificationsSettingsLabelMap,
    notificationSettingsSections,
} from './data.ts'
import styles from './NotificationsSettingsPage.module.scss'

export const NotificationsSettingsPage = () => {
    const {
        isPending
    } = useSelector((state: RootState) => state.notificationSettings)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(notificationSettingsModel.thunks.getNotificationsSettingsThunk())
    }, [])

    return (
        <TransitionFade>
            {isPending && (
                <Loader
                    className={styles.loader}
                    size={'m'}
                    color={'brand'}
                />
            )}
            {!isPending && (
                <>
                    {notificationSettingsSections.map((item, index) => (
                        <NotificationSettingsSection
                            {...item}
                            index={index}
                        />
                    ))}
                </>
            )}
        </TransitionFade>
    )
}

const NotificationSettingsSection: React.FC<{
    index: number
    title: string
    data: (keyof NotificationSettings)[]
}> = ({
    index,
    title,
    data,
}) => {
    return (
        <div
            className={clsx(
                styles.section,
                {
                    [styles['is-first']]: index === 0
                }
            )}
        >
            <p className={styles['section-title']}>{title}</p>
            {data.map(field => (
                <NotificationSettingsCell
                    field={field}
                />
            ))}
        </div>
    )
}

const NotificationSettingsCell: React.FC<{
    field: keyof NotificationSettings
}> = ({
    field
}) => {
    const {
        data,
    } = useSelector((state: RootState) => state.notificationSettings)
    const {
        isLoading,
        updateNotificationSettings
    } = useNotificationSettings()

    return (
        <div className={styles['section-cell']}>
            <p>{notificationsSettingsLabelMap[field]}</p>
            <TransitionFade>
                {isLoading && (
                    <Loader
                        size={'s'}
                        color={'brand'}
                    />
                )}
                {!isLoading && (
                    <Toggle
                        value={data[field]}
                        setValue={async v => {
                            await updateNotificationSettings({
                                [field]: v
                            })
                        }}
                    />
                )}
            </TransitionFade>
        </div>
    )
}