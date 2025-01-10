import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {createEventsModel} from "@/features/events/model"

import {AddressCell} from "@/entities/address/ui"

import {TransitionFade} from "@/shared/ui/TransitionFade";
import {useProjectNavigate} from "@/shared/lib/hooks";
import {InputSearch} from "@/shared/ui/fields/InputSearch"
import {searchAddressModel} from "@/entities/address/model"
import {Icon} from "@/shared/ui/Icon"

import styles from './EventCreateAddress.module.scss'

export const EventCreateAddress = () => {
    const {
        goBack
    } = useProjectNavigate()

    const {
        searchValue,
        isPending,
        data,
    } = useSelector((state: RootState) => state.addressSearch)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <InputSearch
                    className={styles.field}
                    value={searchValue}
                    placeholder={'Введите адрес'}
                    isLoading={isPending}
                    onInput={v => {
                        console.log(v, 'input')
                        dispatch(searchAddressModel.actions.setSearchValue(v))
                    }}
                    onSearch={v => {
                        console.log(v, 'search')
                        dispatch(searchAddressModel.thunks.searchThunk({ search: v }))
                    }}
                />
                <button
                    className={styles.button}
                    onClick={() => {
                        dispatch(searchAddressModel.actions.reset())
                    }}
                >
                    <Icon
                        className={styles['close-icon']}
                        name={'cross-icon'}
                        view={'placeholder'}
                        size={21}
                    />
                </button>
            </div>
            <TransitionFade>
                {!isPending && data.length > 0 && (
                    <>
                        {data.map(item => (
                            <AddressCell
                                className={styles.item}
                                address={item}
                                onClick={address => {
                                    goBack()
                                    dispatch(createEventsModel.actions.update({ address }))
                                }}
                            />
                        ))}
                    </>
                )}
            </TransitionFade>
        </div>
    )
}