import React from "react"
import {clsx} from "clsx"

import {convertFileInputToBase64, PropsDefault} from "@/shared/lib"
import {images} from "@/shared/assets/images"

import styles from './UploadAvatar.module.scss'
import {Loader} from "@/shared/ui/Loader";
import {TransitionFade} from "@/shared/ui/TransitionFade";

export type UploadAvatarProps = PropsDefault<{
    value: string
    isLoading?: boolean
    setValue: (v: string) => void
}>

export const UploadAvatar: React.FC<UploadAvatarProps> = ({
    className,
    value,
    isLoading,
    setValue
}) => {
    return (
        <TransitionFade
            className={clsx(
                styles.root,
                className,
            )}
        >
            {isLoading && (
                <Loader
                    key={'Loader'}
                    className={styles.loader}
                    size={'m'}
                    color={'brand'}
                />
            )}
            {!isLoading && (
                <>
                    <img
                        className={styles.icon}
                        src={value ? value : images.user}
                        alt={'user'}
                    />
                    <input
                        className={styles.field}
                        type={'file'}
                        accept={'image/*'}
                        onChange={e => {
                            convertFileInputToBase64(e)
                                .then(res => {
                                    setValue(res ?? '')
                                })
                        }}
                    />
                </>
            )}
        </TransitionFade>
    )
}