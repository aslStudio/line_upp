import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import styles from './InviteLink.module.scss'
import {InviteLinkType} from "@/shared/api/enum.ts";
import {Tabs} from "@/shared/ui/Tabs";
import {createEventsModel} from "@/features/events/model";
import {CopyCell} from "@/shared/ui/CopyCell";
import {TransitionFade} from "@/shared/ui/TransitionFade";
import {Input} from "@/shared/ui/fields/Input";

const tabsData = [
    {
        id: InviteLinkType.PUBLIC,
        text: 'Общедоступная'
    },
    {
        id: InviteLinkType.LIMITED,
        text: 'Ограниченная'
    },
]

export const InviteLink = () => {
    const { data } = useSelector((state: RootState) => state.createEvent)
    const dispatch = useDispatch<AppDispatch>()

    if (!data.id) {
        return null
    }

    return (
        <div className={styles.root}>
            <p className={styles.title}>Ссылка-приглашение</p>
            <p className={styles.description}>Пригласите тех, кого бы вы хотели видеть у себя на мероприятии</p>
            <Tabs
                className={styles.tabs}
                value={data.inviteLinkType}
                data={tabsData}
                setValue={v => {
                    dispatch(createEventsModel.actions.update({
                        inviteLinkType: v as InviteLinkType,
                    }))
                }}
            />
            <TransitionFade>
                {data.inviteLinkType === InviteLinkType.LIMITED && (
                    <div>
                        <p className={styles.label}>Количество использований</p>
                        <div className={styles.row}>
                            <Input
                                className={styles.field}
                                mask={'price'}
                                value={`${data.inviteLinkLimit}`}
                                setValue={v => {
                                    dispatch(createEventsModel.actions.update({
                                        inviteLinkLimit: Number(v),
                                    }))
                                }}
                            />
                            <p>человек</p>
                        </div>
                    </div>
                )}
            </TransitionFade>
            <CopyCell
                value={data.inviteLink}
            />
        </div>
    )
}