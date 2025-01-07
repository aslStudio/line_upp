import React, {useCallback, useEffect, useMemo, useState} from "react"
import {clsx} from "clsx"

import {PropsDefault} from "@/shared/lib"
import {Textarea} from "@/shared/ui/fields/Textarea"
import {TransitionFade} from "@/shared/ui/TransitionFade"
import {Loader} from "@/shared/ui/Loader"

import styles from "./Note.module.scss"

export type NoteProps = PropsDefault<{
    initValue: string
    isLoading: boolean
    onUpdateValue: (value: string) => Promise<void>
}>

export const Note: React.FC<NoteProps> = ({
    className,
    initValue,
    isLoading,
    onUpdateValue
}) => {
    const [isEdit, setIsEdit] = useState(false)
    const [note, setNote] = useState<string>('')
    const [value, setValue] = useState<string>('')

    const buttonText = useMemo(() => {
        if (isEdit) {
            return 'Сохранить'
        }

        if (note) {
            return 'Изменить'
        }

        return 'Добавить'
    }, [isEdit, note])

    const onUpdate = useCallback(async () => {
        await onUpdateValue(value)
        setNote(value)
        setIsEdit(false)
    }, [value])

    useEffect(() => {
        if (initValue) {
            setNote(initValue)
            setValue(initValue)
        }
    }, [initValue])

    return (
        <>
            <div
                className={clsx(
                    styles.root,
                    className,
                )}
            >
                <div className={styles.header}>
                    <p>Ваша заметка</p>
                    <button
                        className={clsx({
                            [styles['is-loading']]: isLoading,
                        })}
                        onClick={() => {
                            if (!isEdit) {
                                setIsEdit(true)
                            } else {
                                onUpdate()
                            }
                        }}
                    >
                        <TransitionFade>
                            {isLoading && (
                                <Loader
                                    className={styles.loader}
                                    size={'s'}
                                    color={'brand'}
                                />
                            )}
                            <p>
                                {buttonText}
                            </p>
                        </TransitionFade>
                    </button>
                </div>
                {isEdit && (
                    <Textarea
                        value={value}
                        placeholder={'Ваша заметка'}
                        setValue={setValue}
                    />
                )}
                {note && !isEdit && (
                    <p className={styles.value}>{note}</p>
                )}
            </div>
        </>
    )
}