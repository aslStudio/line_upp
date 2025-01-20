import React, {useMemo} from "react"
import {clsx} from "clsx"

import {PropsDefault, toButtifyPhone} from "@/shared/lib"

import styles from './UserProfileBio.module.scss'

export type UserProfileBioProps = PropsDefault<{
    avatar: string
    username: string
    name: string
    phone: string

    isHiddenName: boolean
    isHiddenPhone: boolean
}>

export const UserProfileBio: React.FC<UserProfileBioProps> = ({
    className,
    avatar,
    username,
    name,
    phone,

    isHiddenName,
    isHiddenPhone,
}) => {
    const resultName = useMemo(() => {
        if (isHiddenName) {
            return Array(name.length).fill('*').join('')
        }

        return name
    }, [isHiddenName, name])

    const resultPhone = useMemo(() => {
        if (isHiddenPhone) {
            return Array(11).fill('*').join('')
        }

        return toButtifyPhone(phone)
    }, [isHiddenPhone, phone])

    return (
        <div
            className={clsx(
                styles.root,
                className,
            )}
        >
            <div className={styles.avatar}>
                <img
                    src={avatar}
                    alt={'avatar'}
                />
            </div>
            <p className={styles.name}>{username} · {isHiddenName ? <span>{resultName}</span> : resultName}</p>
            <p className={styles.phone}>{resultPhone}</p>
        </div>
    )
}