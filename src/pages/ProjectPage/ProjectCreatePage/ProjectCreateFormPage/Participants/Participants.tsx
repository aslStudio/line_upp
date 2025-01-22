import { useState} from "react"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import { UserCellList, UserProjectCell} from "@/entities/user/ui"

import {Tabs} from "@/shared/ui/Tabs"
import {TransitionFade} from "@/shared/ui/TransitionFade"
import {ButtonCell} from "@/shared/ui/ButtonCell"

import styles from './Participants.module.scss'
import {useProjectNavigate} from "@/shared/lib/hooks";
import {CreateProjectPaths, ProjectPaths, RootPaths} from "@/shared/lib";
import {createProjectModel} from "@/features/project/model";

enum ParticipantsTab {
    INVITED,
    PARTICIPANTS,
}

const tabsData: {
    id: ParticipantsTab,
    text: string
}[] =[
    {
        id: ParticipantsTab.INVITED,
        text: 'Приглашены'
    },
    {
        id: ParticipantsTab.PARTICIPANTS,
        text: 'Участники'
    }
]

export const Participants = () => {
    const { navigate } = useProjectNavigate()

    const {
        data,
         errors
    } = useSelector((state: RootState) => state.createProject)
    const dispatch = useDispatch<AppDispatch>()

    const [tab, setTab] = useState(ParticipantsTab.INVITED)

    return (
        <div className={styles.root}>
            <p className={styles.title}>Участники</p>
            <p className={styles.description}>Добавьте участников, чтобы они могли следить и откликаться на ваши события</p>
            {data.id && (
                <Tabs
                    className={styles.tabs}
                    value={tab}
                    data={tabsData}
                    setValue={v => setTab(v as ParticipantsTab)}
                />
            )}
            <TransitionFade>
                {tab === ParticipantsTab.INVITED && (
                    <UserCellList
                        list={data.invited}
                        render={user => (
                            <UserProjectCell
                                {...user}
                                onRemove={() => {
                                    dispatch(createProjectModel.actions.removeInvited(user))
                                }}
                            />
                        )}
                    />
                )}
                {tab === ParticipantsTab.PARTICIPANTS && (
                    <UserCellList
                        list={data.participants}
                        render={user => (
                            <UserProjectCell
                                {...user}
                                onRemove={() => {
                                    dispatch(createProjectModel.actions.removeParticipant(user))
                                }}
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
                        RootPaths.PROJECTS,
                        ProjectPaths.CREATE,
                        CreateProjectPaths.PARTICIPANTS
                    )
                }}
            >
                Добавить
            </ButtonCell>
            <TransitionFade>
                {errors.participants && (
                    <p className={styles.error}>Укажите участников</p>
                )}
            </TransitionFade>
        </div>
    )
}