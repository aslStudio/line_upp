import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import {useLeaveSchedule} from "@/features/schedule/hooks"

import {Button} from "@/shared/ui/Button"
import {BottomSheet, useModal} from "@/shared/ui/BottomSheet"
import {useProjectNavigate} from "@/shared/lib/hooks"

import styles from './ScheduleLeaveButton.module.scss'

export const ScheduleLeaveButton = () => {
    const { goBack } = useProjectNavigate()

    const {
        isLoading,
        leave
    } = useLeaveSchedule()
    const {
        schedule
    } = useSelector((state: RootState) => state.scheduleExpand)

    const { isOpen, open, close } = useModal()

    return (
        <>
            <Button
                className={styles.root}
                size={'m'}
                view={'critical'}
                onClick={open}
            >
                Выйти из расписания
            </Button>
            <BottomSheet
                isOpen={isOpen}
                view={'base'}
                setIsOpen={close}
            >
                <p className={styles.title}>Вы уверены, что хотите <br /> удалить расписание?</p>
                <p className={styles.description}>Вы автоматически покинете все <br /> текущие события расписания</p>
                <div className={styles.buttons}>
                    <Button
                        view={'critical'}
                        size={'m'}
                        isLoading={isLoading}
                        onClick={() => {
                            if (schedule) {
                                leave(
                                    schedule.id,
                                    () => {
                                        close()
                                        goBack()
                                    }
                                )
                            }
                        }}
                    >
                        Да
                    </Button>
                    <Button
                        view={'secondary'}
                        size={'m'}
                        onClick={close}
                    >
                        Назад
                    </Button>
                </div>
            </BottomSheet>
        </>
    )
}