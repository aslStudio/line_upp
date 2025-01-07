import {ResponseDefault} from "@/shared/lib/api/createRequest.ts";

export type GetViewerResponse = {
    id: number,
    access_level: {
        id: number,
        createdAt: string,
        updatedAt: string,
        name: string,
        profile: number
    }[],
    user: {
        username: string
    },
    name: string,
    surname: string,
    photo: string,
    telegram: string,
    telegram_chat_id: string,
    info: string,
    email: string,
    personal_link: string,
    personal_links: string[],
    contacts: number[],
    blocked_contacts: number[],
    selected_events: number[]
}

export type ViewerApi = {
    getViewer: () => Promise<ResponseDefault<GetViewerResponse>>
}