import {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {createProjectModel} from "@/features/project/model"

import {organizersSearchModel, User} from "@/entities/user/model"
import {UserCell, UserCellList} from "@/entities/user/ui"

import {InputSearch} from "@/shared/ui/fields/InputSearch"
import {TransitionFade} from "@/shared/ui/TransitionFade"
import {Radio} from "@/shared/ui/Radio"
import {Button} from "@/shared/ui/Button"
import {useProjectNavigate} from "@/shared/lib/hooks";

import styles from './ProjectCreateOrganizersPage.module.scss'

export const ProjectCreateOrganizersPage = () => {
    const { goBack } = useProjectNavigate()

    const {
        searchValue,
        data,
        isPending
    } = useSelector((state: RootState) => state.organizersSearch)
    const {
        data: { organizers },
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
            organizers: value.map(item => ({
                ...item,
                isCreator: false,
            })),
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
                isDisabled={value.length === 0}
                onClick={onSubmit}
            >
                {buttonText}
            </Button>
        </div>
    )
}