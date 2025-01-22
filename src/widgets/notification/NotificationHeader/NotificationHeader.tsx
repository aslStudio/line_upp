import {useMemo} from "react"
import {useLocation} from "react-router-dom"

import {Button} from "@/shared/ui/Button"
import {images} from "@/shared/assets/images"
import {NotificationPaths, RootPaths} from "@/shared/lib"
import {TransitionFade} from "@/shared/ui/TransitionFade"
import {TransitionExpand} from "@/shared/ui/TransitionExpand"
import {Tabs, TabsProps} from "@/shared/ui/Tabs"

import styles from './NotificationHeader.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/store.tsx";
import {notificationFilterModel} from "@/features/notification/model";
import {NotificationFilterButton} from "@/features/notification/ui";
import {useProjectNavigate} from "@/shared/lib/hooks";

const data: TabsProps['data'] = [
    {
        id: 'all',
        text: 'Все'
    },
    {
        id: 'schedule',
        text: 'Расписание'
    },
    {
        id: 'project',
        text: 'Проекты'
    }
]

export const NotificationHeader = () => {
    const location = useLocation()
    const { navigate } = useProjectNavigate()

    const {
        filters,
    } = useSelector((state: RootState) => state.notificationFilters)
    const dispatch = useDispatch<AppDispatch>()

    const isList = useMemo(() => {
        return (
            location.pathname.includes(RootPaths.NOTIFICATION) &&
            location.pathname.includes(NotificationPaths.LIST)
        )
    }, [location])

    const isArchive = useMemo(() => {
        return (
            location.pathname.includes(RootPaths.NOTIFICATION) &&
            location.pathname.includes(NotificationPaths.ARCHIVE)
        )
    }, [location])

    const isHeader = useMemo(() => {
        return (
            location.pathname.includes(`${RootPaths.NOTIFICATION}/${NotificationPaths.LIST}`) ||
            location.pathname.includes(`${RootPaths.NOTIFICATION}/${NotificationPaths.ARCHIVE}`)
        )
    }, [location])

    if (!isHeader) {
        return null
    }

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className={styles['title-wrapper']}>
                    <p className={styles.title}>Уведомления</p>
                    <TransitionFade>
                        {isList && (
                            <button
                                className={styles['settings-button']}
                                onClick={() => {
                                    navigate(
                                        RootPaths.NOTIFICATION,
                                        NotificationPaths.SETTINGS,
                                    )
                                }}
                            >
                                Настроить
                            </button>
                        )}
                    </TransitionFade>
                </div>
                <div className={styles.buttons}>
                    <Button
                        className={styles.button}
                        view={isList ? 'secondary-flat' : 'brand'}
                        size={'s'}
                        onClick={() => {
                            if (location.pathname.includes(NotificationPaths.ARCHIVE)) {
                                navigate(
                                    RootPaths.NOTIFICATION,
                                    NotificationPaths.LIST
                                )
                            } else {
                                navigate(
                                    RootPaths.NOTIFICATION,
                                    NotificationPaths.ARCHIVE
                                )
                            }
                        }}
                    >
                        <TransitionFade>
                            {isList && (
                                <img
                                    src={images.Notification.ArchiveSecondary}
                                    alt={'Archive'}
                                />
                            )}
                            {!isList && (
                                <img
                                    src={images.Notification.ArchiveDark}
                                    alt={'ArchiveDark'}
                                />
                            )}
                        </TransitionFade>
                    </Button>
                    <NotificationFilterButton />
                </div>
            </div>
            <TransitionExpand
                isShow={isArchive}
            >
                <div className={styles.archive}>
                    <p className={styles['archive-title']}>Архив</p>
                    <p className={styles['archive-description']}>Уведомления из архива автоматически <br/> очищаются
                        каждые 30 дней</p>
                    <Button
                        view={'brand'}
                        size={'m'}
                        onClick={() => {
                        }}
                    >
                        Очистить архив
                    </Button>
                </div>
            </TransitionExpand>
            <Tabs
                data={data}
                value={filters.type}
                setValue={type => {
                    dispatch(notificationFilterModel.actions.setFilter({ type: type as 'all' | 'project' | 'schedule' }))
                }}
            />
        </div>
    )
}