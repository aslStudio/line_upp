import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import {useRemoveProject} from "@/features/project/hooks"

import {Button} from "@/shared/ui/Button"
import {BottomSheet, useModal} from "@/shared/ui/BottomSheet"
import {useProjectNavigate} from "@/shared/lib/hooks"

import styles from './ProjectButtons.module.scss'

export const ProjectButtons = () => {
    const { goBack } = useProjectNavigate()

    const {
        isLoading,
        remove,
    } = useRemoveProject()
    const {
        project
    } = useSelector((state: RootState) => state.projectExpand)

    const { isOpen, open, close } = useModal()

    return (
        <>
            <div className={styles.root}>
                <Button
                    view={'brand'}
                    onClick={() => {
                    }}
                >
                    Редактировать
                </Button>
                <Button
                    view={'critical'}
                    onClick={open}
                >
                    Удалить проект
                </Button>
            </div>
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
                            if (project) {
                                remove(
                                    project.id,
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