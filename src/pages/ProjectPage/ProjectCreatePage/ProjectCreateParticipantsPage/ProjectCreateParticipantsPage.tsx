import {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {createProjectModel} from "@/features/project/model"

import { participantsSearchModel, User} from "@/entities/user/model"
import {UserCell, UserCellList} from "@/entities/user/ui"

import {InputSearch} from "@/shared/ui/fields/InputSearch"
import {TransitionFade} from "@/shared/ui/TransitionFade"
import {Radio} from "@/shared/ui/Radio"
import {Button} from "@/shared/ui/Button"
import {useProjectNavigate} from "@/shared/lib/hooks";

import styles from './ProjectCreateParticipantsPage.module.scss'

export const ProjectCreateParticipantsPage = () => {
    const { goBack } = useProjectNavigate()

    const {
        searchValue,
        data,
        isPending
    } = useSelector((state: RootState) => state.participantsSearch)
    const {
        data: { participants },
    } = useSelector((state: RootState) => state.createProject)
    const dispatch = useDispatch<AppDispatch>()

    const [value, setValue] = useState<User[]>([])

    const buttonText = useMemo(() => {
        if (value.length === 0) {
            return 'Добавьте хотя бы 1 контакт'
        }

        if (value.length === 1) {
            return 'Добавить 1 контакт'
        }

        if (value.length < 5) {
            return `Добавить ${value.length} контакта`
        }

        return `Добавить ${value.length} контактов`
    }, [value])

    const onSubmit = useCallback(() => {
        dispatch(createProjectModel.actions.update({
            invited: value,
        }))
        goBack()
    }, [value, goBack])

    useEffect(() => {
        dispatch(participantsSearchModel.actions.reset())
        dispatch(participantsSearchModel.thunks.getParticipantsThunk({}))
    }, [])

    useEffect(() => {
        setValue(participants)
    }, [participants])

    return (
        <div className={styles.root}>
            <div>
                <InputSearch
                    className={styles.field}
                    value={searchValue}
                    placeholder={'Поиск'}
                    isLoading={isPending}
                    onInput={search => {
                        dispatch(participantsSearchModel.actions.setSearchValue(search))
                    }}
                    onSearch={search => {
                        dispatch(participantsSearchModel.thunks.getParticipantsThunk({
                            search
                        }))
                    }}
                />
                <TransitionFade>
                    {!isPending && data.length > 0 && (
                        <UserCellList
                            render={item => (
                                <Radio
                                    value={value.includes(item)}
                                    setValue={v => {
                                        if (v) {
                                            setValue(prevState => [
                                                ...prevState,
                                                item
                                            ])
                                        } else {
                                            setValue(prevState => prevState.filter(v => v.id !== item.id))
                                        }
                                    }}
                                >
                                    <UserCell
                                        {...item}
                                    />
                                </Radio>
                            )}
                            list={data}
                        />
                    )}
                </TransitionFade>
            </div>
            <Button
                isDisabled={value.length === 0}
                onClick={onSubmit}
            >
                {buttonText}
            </Button>
        </div>
    )
}