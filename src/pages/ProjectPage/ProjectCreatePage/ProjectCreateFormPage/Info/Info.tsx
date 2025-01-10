import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {createProjectModel} from "@/features/project/model"

import {InputUnderline} from "@/shared/ui/fields/InputUnderline"
import {Note} from "@/shared/ui/Note"
import {Cell} from "@/shared/ui/Cell"
import {Toggle} from "@/shared/ui/Toggle"
import {Input} from "@/shared/ui/fields/Input"
import {Select} from "@/shared/ui/Select"
import {ReminderType} from "@/shared/api/enum.ts"
import {TransitionExpand} from "@/shared/ui/TransitionExpand"

import styles from './Info.module.scss'

const dataSelect: {
    id: ReminderType,
    text: string
}[] = [
    {
        id: ReminderType.HOUR,
        text: 'час',
    },
    {
        id: ReminderType.MINUTES,
        text: 'минута',
    },
]

export const Info = () => {
    const { data, errors } = useSelector((state: RootState) => state.createProject)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <div className={styles.root}>
            <InputUnderline
                value={data.name}
                size={'l'}
                error={errors.name}
                errorMessage={'Укажите название проекта'}
                placeholder={'Название'}
                setValue={name => {
                    dispatch(createProjectModel.actions.update({ name }))
                }}
            />
            <InputUnderline
                value={data.comment}
                size={'m'}
                placeholder={'Комментарий'}
                maxLength={100}
                setValue={comment => {
                    dispatch(createProjectModel.actions.update({ comment }))
                }}
            />
            <Note
                className={styles.note}
                initValue={data.note}
                isLoading={false}
                onUpdateValue={async note => {
                    dispatch(createProjectModel.actions.update({ note }))
                }}
            />
            <Cell
                className={styles.cell}
                title={'Подтверждение участия'}
                description={'Будет приходить за определённой вами количество часов перед каждым событием'}
                size={'l'}
            >
                <Toggle
                    value={data.isNeedSubmit}
                    setValue={isNeedSubmit => {
                        dispatch(createProjectModel.actions.update({ isNeedSubmit }))
                    }}
                />
            </Cell>
            <TransitionExpand
                isShow={data.isNeedSubmit}
            >
                <div className={styles.field}>
                    <p className={styles.field}>Напоминать за</p>
                    <div className={styles.inner}>
                        <Input
                            className={styles.input}
                            mask={'number'}
                            value={`${data.reminder.value}`}
                            setValue={v => {
                                dispatch(createProjectModel.actions.update({
                                    reminder: {
                                        value: Number(v),
                                        type: data.reminder.type,
                                    }
                                }))
                            }}
                        />
                        <Select
                            value={data.reminder.type}
                            data={dataSelect}
                            setValue={v => {
                                dispatch(createProjectModel.actions.update({
                                    reminder: {
                                        value: data.reminder.value,
                                        type: v as ReminderType,
                                    }
                                }))
                            }}
                        />
                    </div>
                </div>
            </TransitionExpand>
        </div>
    )
}