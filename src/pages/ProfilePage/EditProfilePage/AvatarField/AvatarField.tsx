import React from "react"
import {useSelector} from "react-redux"
import {clsx} from "clsx"

import {RootState} from "@/app/store.tsx"

import {usePatchViewer} from "@/features/viewer/hooks"

import {PropsDefault} from "@/shared/lib"
import {UploadAvatar} from "@/shared/ui/UploadAvatar"

import styles from './AvatarField.module.scss'

export const AvatarField: React.FC<PropsDefault> = ({
    className
}) => {
    const {
        data
    } = useSelector((state: RootState) => state.viewer)
    const { isUpdating, updateField } = usePatchViewer()

    return (
        <div
            className={clsx(
                styles.root,
                className,
            )}
        >
            <UploadAvatar
                className={styles.field}
                value={data.avatar}
                isLoading={isUpdating}
                setValue={avatar => updateField({ avatar })}
            />
        </div>
    )
}