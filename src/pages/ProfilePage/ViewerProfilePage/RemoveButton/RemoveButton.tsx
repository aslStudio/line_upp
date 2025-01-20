import React from "react"

import {useRemoveAccount} from "@/features/viewer/hooks"

import {PropsDefault} from "@/shared/lib"
import {Button} from "@/shared/ui/Button"
import {BottomSheet, useModal} from "@/shared/ui/BottomSheet"

import styles from './RemoveButton.module.scss'

export const RemoveButton: React.FC<PropsDefault> = ({
    className
}) => {
    const { remove, isLoading } = useRemoveAccount()
    const { isOpen, open, close } = useModal()

    return (
        <>
            <Button
                className={className}
                view={'critical_transparent'}
                size={'m'}
                onClick={open}
            >
                Удалить аккаунт
            </Button>
            <BottomSheet
                isOpen={isOpen}
                setIsOpen={close}
            >
                <p className={styles.title}>Вы уверены, что хотите <br /> удалить аккаунт?</p>
                <p className={styles.description}>Все данные связанные с аккаунтом <br /> будут безвозвратно утеряны</p>
                <div className={styles.buttons}>
                    <Button
                        view={'critical'}
                        size={'m'}
                        isLoading={isLoading}
                        onClick={() => {
                            remove().then(() => {
                                close()
                            })
                        }}
                    >
                        Удалить аккаунт
                    </Button>
                    <Button
                        view={'secondary'}
                        size={'m'}
                        onClick={close}
                    >
                        Отмена
                    </Button>
                </div>
            </BottomSheet>
        </>
    )
}