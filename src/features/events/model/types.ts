import {Color} from "@/entities/color/model"
import {Project, SubGroup} from "@/entities/projects/model"
import {Schedule} from "@/entities/schedule/model"

import {EventType, OrderStatus} from "@/shared/api/enum.ts"

export type EventFilters = {
    color: Color[]
    project: Project[]
    subgroup: SubGroup[]
    schedule: Schedule[]
    eventType: EventType[]
    orderStatus: OrderStatus[]
    isFavorite: boolean
}