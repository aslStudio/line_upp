import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {Icon} from "@/shared/ui/Icon"

import styles from './Image.module.scss'
import {TransitionFade} from "@/shared/ui/TransitionFade";
import React from "react";
import {convertFileInputToBase64} from "@/shared/lib";
import {createEventsModel} from "@/features/events/model";

export const Image = () => {
    const {
        data
    } = useSelector((state: RootState) => state.createEvent)
    const dispatch = useDispatch<AppDispatch>()

    async function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        const base64 = await convertFileInputToBase64(event)
        dispatch(createEventsModel.actions.update({
            image: base64 ?? ''
        }))
    }

    return (
        <div className={styles.root}>
            <Icon
                className={styles.icon}
                name={'cross-icon'}
                view={'brand'}
                size={30}
            />
            <p
                className={styles.text}
            >
                Добавить фотографию
            </p>

            <TransitionFade
                className={styles.image}
            >
                {data.image && (
                    <img
                        src={data.image}
                        alt={'image'}
                    />
                )}
            </TransitionFade>
            <input
                className={styles.field}
                type={'file'}
                accept={'image/*'}
                onChange={onChange}
            />
        </div>
    )
}