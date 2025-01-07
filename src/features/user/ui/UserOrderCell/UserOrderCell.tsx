import React from "react"

import {PropsDefault} from "@/shared/lib"
import {Icon} from "@/shared/ui/Icon"

import styles from './UserOrderCell.module.scss'
import {clsx} from "clsx";
import {useChangeOrderStatus} from "@/features/events/hooks";
import {TransitionFade} from "@/shared/ui/TransitionFade";
import {Loader} from "@/shared/ui/Loader";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/store.tsx";
import {expandModel} from "@/entities/events/model";

export type UserOrderCellProps = PropsDefault<{
    eventId: number | string
    id: number
    avatar: string
    name: string
}>

export const UserOrderCell: React.FC<UserOrderCellProps> = ({
    className,
    eventId,
    id,
    avatar,
    name,
}) => {
    const dispatch = useDispatch<AppDispatch>()

    const {
        isLoading,
        submitOrder,
        rejectOrder,
    } = useChangeOrderStatus()

    return (
        <div className={clsx(
            className,
            styles.root,
        )}>
            <div className={styles.wrapper}>
                <div className={styles.avatar}>
                    <img
                        src={avatar}
                        alt={'avatar'}
                    />
                </div>
                <p className={styles.name}>{name}</p>
            </div>
            <TransitionFade className={styles.buttons}>
                {isLoading && (
                    <Loader
                        color={'white'}
                        size={'s'}
                    />
                )}
                {!isLoading && (
                    <>
                        <button
                            disabled={isLoading}
                            onClick={() => {
                                submitOrder({
                                    eventId,
                                    userId: id,
                                }).then(() => {
                                    dispatch(expandModel.actions.submitOrder({
                                        userId: id,
                                    }))
                                })
                            }}
                        >
                            <Icon
                                name={'checked'}
                                view={'dark'}
                                size={22}
                            />
                        </button>
                        <button
                            disabled={isLoading}
                            onClick={() => {
                                rejectOrder({
                                    eventId,
                                    userId: id,
                                }).then(() => {
                                    dispatch(expandModel.actions.rejectOrder({
                                        userId: id,
                                    }))
                                })
                            }}
                        >
                            <Icon
                                name={'minus'}
                                view={'dark'}
                                size={22}
                            />
                        </button>
                    </>
                )}
            </TransitionFade>
        </div>
    )
}