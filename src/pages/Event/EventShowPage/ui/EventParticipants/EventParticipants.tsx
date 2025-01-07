import {useState} from "react"
import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import {UserCell, UserCellList} from "@/entities/user/ui"

import {Tabs} from "@/shared/ui/Tabs";
import {TransitionFade} from "@/shared/ui/TransitionFade";
import {UserOrderCell} from "@/features/user/ui/UserOrderCell";

import styles from './EventParticipants.module.scss'

enum ParticipantTab {
    ORDERS,
    PARTICIPANTS,
    REJECTED,
}

const data: {
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

export const EventParticipants = () => {
    const {
        event
    } = useSelector((state: RootState) => state.eventExpand)

    const [tab, setTab] = useState(ParticipantTab.ORDERS)

    if (event?.isOrganizer) {
        return  (
            <div className={styles.root}>
                <div className={styles.header}>
                    <p className={styles.title}>Участники</p>
                    <p className={styles.description}>Вы можете управлять заявками и участниками в режиме редактирования</p>
                </div>
                <Tabs
                    value={tab}
                    data={data}
                    setValue={v => setTab(v as ParticipantTab)}
                />
                <TransitionFade>
                    {tab === ParticipantTab.ORDERS && (
                        <UserCellList
                            list={event.orders}
                            render={user => (
                                <UserOrderCell
                                    {...user}
                                    eventId={event.id}
                                />
                            )}
                        />
                    )}
                    {tab === ParticipantTab.PARTICIPANTS && (
                        <UserCellList
                            list={event.participants}
                            render={user => (
                                <UserCell
                                    {...user}
                                />
                            )}
                        />
                    )}
                    {tab === ParticipantTab.REJECTED && (
                        <UserCellList
                            list={event.rejectedOrders}
                            render={user => (
                                <UserCell
                                    {...user}
                                />
                            )}
                        />
                    )}
                </TransitionFade>
            </div>
        )
    }

    return (
        <UserCellList
            title={'Участники'}
            render={item => (
                <UserCell
                    {...item}
                />
            )}
            list={event?.participants ?? []}
        />
    )
}
