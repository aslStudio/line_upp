import {useState} from "react"
import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import styles from './ProjectParticipants.module.scss'
import {Tabs} from "@/shared/ui/Tabs";
import {TransitionFade} from "@/shared/ui/TransitionFade";
import {UserCell, UserCellList} from "@/entities/user/ui";

enum ProjectParticipantsTab {
    INVITED,
    PARTICIPANTS,
}

const data: {
    id: ProjectParticipantsTab,
    text: string
}[] = [
    {
        id: ProjectParticipantsTab.INVITED,
        text: 'Приглашены'
    },
    {
        id: ProjectParticipantsTab.PARTICIPANTS,
        text: 'Участники'
    }
]

export const ProjectParticipants = () => {
    const {
        project
    } = useSelector((state: RootState) => state.projectExpand)

    const [tab, setTab] = useState(ProjectParticipantsTab.INVITED)

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <p className={styles.title}>Участники проекта</p>
                <p className={styles.description}>Добавьте участников, чтобы они могли следить и откликаться на ваши события</p>
            </div>
            <Tabs
                value={tab}
                data={data}
                setValue={v => setTab(v as ProjectParticipantsTab)}
            />
            <TransitionFade>
                {tab === ProjectParticipantsTab.INVITED && (
                    <UserCellList
                        list={project?.invited ?? []}
                        render={user => (
                            <UserCell
                                {...user}
                            />
                        )}
                    />
                )}
                {tab === ProjectParticipantsTab.PARTICIPANTS && (
                    <UserCellList
                        list={project?.participants ?? []}
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