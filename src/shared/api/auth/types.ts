import {ResponseDefault} from "@/shared/lib/api/createRequest.ts"

export type RegistrationParams = {
    phone: string
    username: string // nickname
    password: string
}

export type SendCodeParams = {
    phone: string
}

export type ConfirmCodeParams = {
    phone: string
    random_code: string
}

export type ResetPasswordParams = {
    profileId: string | number
    password: string
}

export type AuthApi = {
    registration: (p: RegistrationParams) =>
        Promise<ResponseDefault<null>>
    sendCode: (params: SendCodeParams) =>
        Promise<ResponseDefault<null>>
    confirmCode: (params: ConfirmCodeParams) =>
        Promise<ResponseDefault<null>>
    resetPassword: (params: ResetPasswordParams) =>
        Promise<ResponseDefault<null>>
}