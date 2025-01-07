import React, {useCallback, useEffect, useState} from "react"
import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import {usePatchEvent} from "@/features/events/hooks"

import {PropsDefault} from "@/shared/lib"

import styles from "./EventNote.module.scss"
import {BottomSheet, useModal} from "@/shared/ui/BottomSheet";
import {Textarea} from "@/shared/ui/fields/Textarea";
import {Button} from "@/shared/ui/Button";
import {clsx} from "clsx";

export const EventNote: React.FC<PropsDefault> = ({
    className
}) => {
    const {
        event
    } = useSelector((state: RootState) => state.eventExpand);

    const {
        isLoading,
        patchEvent
    } = usePatchEvent()
    const {
        isOpen,
        open,
        close,
    } = useModal()

    const [note, setNote] = useState<string>('')
    const [value, setValue] = useState<string>('')

    const onUpdate = useCallback(async () => {
        if (event) {
            await patchEvent({
                id: event.id,
                isFavorite: event.isFavorite,
                note: value,
            })
            setNote(value)
            close()
        }
    }, [value])

    useEffect(() => {
        if (event) {
            setNote(event.note)
            setValue(event.note)
        }
    }, [event])

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
                    <button onClick={open}>
                        {note ? 'Изменить' : 'Добавить'}
                    </button>
                </div>
                {note && (
                    <p className={styles.value}>{note}</p>
                )}
            </div>
            <BottomSheet
                isOpen={isOpen}
                setIsOpen={close}
            >
                <Textarea
                    value={value}
                    placeholder={'Ваша заметка'}
                    setValue={setValue}
                />
                <Button
                    className={styles.button}
                    isLoading={isLoading}
                    onClick={onUpdate}
                >
                    Сохранить
                </Button>
            </BottomSheet>
        </>
    )
}