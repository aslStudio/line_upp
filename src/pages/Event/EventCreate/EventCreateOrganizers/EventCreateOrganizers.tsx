import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {createEventsModel} from "@/features/events/model"

import {organizersSearchModel, User} from "@/entities/user/model"
import {UserCell, UserCellList} from "@/entities/user/ui"

import {InputSearch} from "@/shared/ui/fields/InputSearch"
import {TransitionFade} from "@/shared/ui/TransitionFade"
import {Radio} from "@/shared/ui/Radio"
import {Button} from "@/shared/ui/Button"
import {useProjectNavigate} from "@/shared/lib/hooks";

import styles from './EventCreateOrganizers.module.scss'

export const EventCreateOrganizers = () => {
    const { goBack } = useProjectNavigate()

    const {
        searchValue,
        data,
        isPending
    } = useSelector((state: RootState) => state.organizersSearch)
    const {
        data: { organizers },
    } = useSelector((state: RootState) => state.createEvent)
    const dispatch = useDispatch<AppDispatch>()

    const [value, setValue] = useState<User[]>([])

    const onSubmit = useCallback(() => {
        dispatch(createEventsModel.actions.update({
            organizers: value,
        }))
        goBack()
    }, [value, goBack])

    useEffect(() => {
        dispatch(organizersSearchModel.actions.reset())
        dispatch(organizersSearchModel.thunks.getOrganizersThunk({}))
    }, [])

    useEffect(() => {
        setValue(organizers)
    }, [organizers])

    return (
        <div className={styles.root}>
            <div>
                <InputSearch
                    className={styles.field}
                    value={searchValue}
                    placeholder={'Поиск'}
                    isLoading={isPending}
                    onInput={search => {
                        dispatch(organizersSearchModel.actions.setSearchValue(search))
                    }}
                    onSearch={search => {
                        dispatch(organizersSearchModel.thunks.getOrganizersThunk({
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
                onClick={onSubmit}
            >
                {value.length ? `Добавить ${value.length} контакта` : 'Добавьте хотя бы 1 контакт'}
            </Button>
        </div>
    )
}