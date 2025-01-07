import React from "react"
import {clsx} from "clsx"

import {Address} from "@/entities/address/model"

import {PropsDefault } from "@/shared/lib"

import styles from './AddressCell.module.scss'

export type AddressCellProps = PropsDefault<{
    address: Address
    onClick: (v: Address) => void
}>

export const AddressCell: React.FC<AddressCellProps> = ({
    className,
    address,
    onClick
}) => {
    return (
        <div
            className={clsx(
                className,
                styles.root,
            )}
            onClick={() => onClick(address)}
        >
            <p className={styles.title}>{address.value}</p>
            <p className={styles.description}>{address.country}, {address.city}</p>
        </div>
    )
}