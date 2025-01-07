import React from "react"

import {PropsDefault} from "@/shared/lib"
import { OrderStatus} from "@/shared/api/enum.ts"
import {CheckboxList} from "@/shared/ui/CheckboxList";

export type OrderStatusCheckListProps = PropsDefault<{
    value: OrderStatus[]
    setValue: (value: OrderStatus[]) => void
}>

export const OrderStatusCheckList: React.FC<OrderStatusCheckListProps> = ({
    className,
    value,
    setValue
}) => {
    const data = [
        {
            id: OrderStatus.PROCESSING,
            text: 'Подана заявка'
        },
        {
            id: OrderStatus.APPROVED,
            text: 'Я участник'
        }
    ]

    return (
        <CheckboxList
            className={className}
            data={data}
            value={value}
            setValue={v => setValue(v as OrderStatus[])}
        />
    )
}