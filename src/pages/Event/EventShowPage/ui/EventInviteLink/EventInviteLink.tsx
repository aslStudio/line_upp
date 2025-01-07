import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import {CopyCell} from "@/shared/ui/CopyCell"

import styles from './EventInviteLink.module.scss'

export const EventInviteLink = () => {
    const {
        event
    } = useSelector((state: RootState) => state.eventExpand);

    if (!event?.isOrganizer) {
        return null
    }

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <p className={styles.title}>Ссылка-приглашение</p>
                <p className={styles.description}>Пригласите тех, кого бы вы хотели видеть у себя на мероприятии</p>
            </div>
            <CopyCell
                value={event?.inviteLink ?? ''}
            />
        </div>
    )
}