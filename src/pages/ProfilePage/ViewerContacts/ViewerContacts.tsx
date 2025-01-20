import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {contactsSearchModel} from "@/entities/user/model"
import {UserCell, UserCellList} from "@/entities/user/ui"

import {InputSearch} from "@/shared/ui/fields/InputSearch"
import {TransitionFade} from "@/shared/ui/TransitionFade"

import styles from './ViewerContacts.module.scss'
import {useEffect} from "react";

export const ViewerContacts = () => {
    const {
        searchValue,
        contacts,
        global,
        isPending,
    } = useSelector((state: RootState) => state.contactsSearch)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(contactsSearchModel.thunks.getContactsThunk({
            search: ''
        }))
    }, []);

    return (
        <div className={styles.root}>
            <div>
                <InputSearch
                    className={styles.field}
                    value={searchValue}
                    placeholder={'Поиск'}
                    isLoading={isPending}
                    onInput={search => {
                        dispatch(contactsSearchModel.actions.setSearchValue(search))
                    }}
                    onSearch={search => {
                        dispatch(contactsSearchModel.thunks.getContactsThunk({
                            search
                        }))
                    }}
                />
                <TransitionFade>
                    {!isPending && (
                        <>
                            <div className={styles.list}>
                                <p className={styles.label}>Ваши контакты</p>
                                <UserCellList
                                    render={item => (
                                        <UserCell
                                            {...item}
                                        />
                                    )}
                                    list={contacts}
                                />
                            </div>
                            {global.length > 0 && (
                                <div className={styles.list}>
                                    <p className={styles.label}>Глобальный поиск</p>
                                    <UserCellList
                                        render={item => (
                                            <UserCell
                                                {...item}
                                            />
                                        )}
                                        list={global}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </TransitionFade>
            </div>
        </div>
    )
}