import {ResponseDefault} from "@/shared/lib/api/createRequest.ts";
import {GetEventsResponse, GetNearestEventsList} from "@/shared/api/events/types.ts";
import {TimeStamp} from "@/shared/lib";
import {CalendarEvent} from "@/entities/events/model";

export function getParticipantsAvatar(participants: {
    id: number
    avatar: string
    name: string
}[]) {
    if (participants.length > 2) {
        return participants.slice(0, 2)
    }

    return participants
}

export function getHiddenParticipantsAvatars(participants: {
    id: number
    avatar: string
    name: string
}[]) {
    if (participants.length > 2) {
        return participants.length - 2
    }

    return 0
}

export function getParticipantsNames(participants: {
    id: number
    avatar: string
    name: string
}[]) {
    if (participants.length > 1) {
        return `${participants[0].name} и еще ${participants.length - 1}`
    }

    return participants[0] ? `${participants[0].name}` : ''
}

export function toDomainList(data: (
    ResponseDefault<GetEventsResponse | GetNearestEventsList> & {
    startDate: TimeStamp
    endDate: TimeStamp
}
    )) {
    const pool: Record<TimeStamp, CalendarEvent> = {}

    if (!data.error) {
        data.payload.forEach(item => {
            if (`${item.date}` in pool) {
                pool[`${item.date}`] = {
                    ...pool[`${item.date}`],
                    events: [
                        ...pool[`${item.date}`].events,
                        ...item.events,
                    ]
                }
            } else {
                pool[`${item.date}`] = item
            }
        })
    }

    const result: CalendarEvent[] = []

    const currentDate = new Date(data.startDate);
    const end = new Date(data.endDate);

    while (currentDate <= end) {
        result.push({
            date: currentDate.getTime(),
            events: pool[`${currentDate.getTime()}`]?.events || [],
        });

        currentDate.setDate(currentDate.getDate() + 1)
    }

    return result
}