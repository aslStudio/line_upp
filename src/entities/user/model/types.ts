export type User = {
    id: number | string
    name: string
    avatar: string
}

export type ExpandUser = {
    id: number | string
    phone: string
    email: string
    avatar: string
    nickname: string
    name: string
    telegram: string
    about: string

    isBlocked: boolean
    isShowName: boolean
    isShowPhone: boolean
    isShowAbout: boolean
    isShowEmail: boolean
    isShowTelegram: boolean
}