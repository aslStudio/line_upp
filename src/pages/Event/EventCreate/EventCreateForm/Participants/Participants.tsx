import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import {UserCell, UserCellList} from "@/entities/user/ui"

import {ButtonCell} from "@/shared/ui/ButtonCell"
import {useProjectNavigate} from "@/shared/lib/hooks"
import {CreateEventPaths, EventsPaths, RootPaths} from "@/shared/lib"

import styles from './Participants.module.scss'
import {useEffect, useState} from "react";
import {Tabs} from "@/shared/ui/Tabs";
import {TransitionFade} from "@/shared/ui/TransitionFade";
import {UserOrderCell} from "@/features/user/ui/UserOrderCell";
import {clsx} from "clsx";

enum ParticipantTab {
    ORDERS,
    PARTICIPANTS,
    REJECTED,
}

const tabsData: {
    id: ParticipantTab
    text: string
}[] = [
    {
        id: ParticipantTab.ORDERS,
        text: 'Заявки'
    },
    {
        id: ParticipantTab.PARTICIPANTS,
        text: 'Участники'
    },
    {
        id: ParticipantTab.REJECTED,
        text: 'Отклонены'
    },
]

export const Participants = () => {
    const {
        navigate
    } = useProjectNavigate()

    const {
        data
    } = useSelector((state: RootState) => state.createEvent)

    const [tab, setTab] = useState(ParticipantTab.ORDERS)

    useEffect(() => {
        if (data.id) {
            setTab(ParticipantTab.ORDERS)
        } else {
            setTab(ParticipantTab.PARTICIPANTS)
        }
    }, [data])

    return (
        <div
            className={clsx({
                [styles['is-last']]: !!data.id
            })}
        >
            <p className={styles.title}>Участники</p>
            <p className={styles.description}>Вы можете управлять заявками и участниками в режиме редактирования</p>
            {data.id && (
                <Tabs
                    className={styles.tabs}
                    value={tab}
                    data={tabsData}
                    setValue={v => setTab(v as ParticipantTab)}
                />
            )}
            <TransitionFade>
                {tab === ParticipantTab.ORDERS && (
                    <UserCellList
                        key={'ORDERS'}
                        list={data.orders}
                        render={item => (
                            <UserOrderCell
                                {...item}
                                eventId={data.id!}
                            />
                        )}
                    />
                )}
                {tab === ParticipantTab.PARTICIPANTS && (
                    <UserCellList
                        key={'PARTICIPANTS'}
                        list={data.participants}
                        render={item => (
                            <UserCell
                                {...item}
                            />
                        )}
                    />
                )}
                {tab === ParticipantTab.REJECTED && (
                    <UserCellList
                        key={'REJECTED'}
                        list={data.rejectedOrders}
                        render={item => (
                            <UserCell
                                {...item}
                            />
                        )}
                    />
                )}
            </TransitionFade>
            <ButtonCell
                iconStyles={{
                    transform: 'rotate(45deg)',
                }}
                icon={'cross-icon'}
                withHorizontalPadding={true}
                onClick={() => {
                    navigate(
                        RootPaths.EVENTS,
                        EventsPaths.CREATE,
                        CreateEventPaths.PARTICIPANTS,
                    )
                }}
            >
                Добавить
            </ButtonCell>
        </div>
    )
}
