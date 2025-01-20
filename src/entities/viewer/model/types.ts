export type ExpandViewer = {
    id: number | string
    avatar: string
    phone: string
    email: string
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