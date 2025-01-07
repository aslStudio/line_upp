import React, {useCallback, useEffect, useState} from "react"
import {useSelector} from "react-redux"
import {clsx} from "clsx"

import {RootState} from "@/app/store.tsx"

import {usePatchSchedule} from "@/features/schedule/hooks";

import {PropsDefault} from "@/shared/lib"
import {BottomSheet, useModal} from "@/shared/ui/BottomSheet"
import {Textarea} from "@/shared/ui/fields/Textarea"
import {Button} from "@/shared/ui/Button"

import styles from "./ScheduleNote.module.scss"

export const ScheduleNote: React.FC<PropsDefault> = ({
    className
}) => {
    const {
        schedule
    } = useSelector((state: RootState) => state.scheduleExpand);

    const {
        isLoading,
        patchSchedule
    } = usePatchSchedule()
    const {
        isOpen,
        open,
        close,
    } = useModal()

    const [note, setNote] = useState<string>('')
    const [value, setValue] = useState<string>('')

    const onUpdate = useCallback(async () => {
        if (schedule) {
            await patchSchedule({
                id: schedule.id,
                note: value,
            })
            setNote(value)
            close()
        }
    }, [value, schedule])

    useEffect(() => {
        if (schedule) {
            setNote(schedule.note)
            setValue(schedule.note)
        }
    }, [schedule])

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