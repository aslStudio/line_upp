import {ResponseDefault} from "@/shared/lib/api/createRequest.ts";

export type GetViewerResponse = {
    id: number | string
    phone: string
    email: string
    avatar: string
    nickname: string
    name: string
    telegram: string
    about: string
    canBeFindByNickname: boolean
    needReminding: boolean

    isShowName: boolean
    isShowPhone: boolean
    isShowAbout: boolean
    isShowEmail: boolean
    isShowTelegram: boolean
}

export type PatchViewerParams = Partial<{
    avatar: string
    phone: string
    email: string
    nickname: string
    name: string
    telegram: string
    about: string
    canBeFindByNickname: boolean
    needReminding: boolean
}>

export type ViewerApi = {
    getViewer: () =>
        Promise<ResponseDefault<GetViewerResponse>>
    patchViewer: (p: PatchViewerParams) =>
        Promise<ResponseDefault>
    removeAccount: () =>
        Promise<ResponseDefault>
}