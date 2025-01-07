import { ResponseDefault } from "@/shared/lib/api/createRequest"

export type CreateTokenParams = {
    username: string
    password: string
}

export type CreateTokenResponse = {
    access: string
    refresh: string
}

export type RefreshTokenParams = {
    refresh: string
}

export type RefreshTokenResponse = {
    access: string
}

export type TokenApi = {
    create: (params: CreateTokenParams) => 
        Promise<ResponseDefault<CreateTokenResponse>>
    refresh: (params: RefreshTokenParams) => 
        Promise<ResponseDefault<RefreshTokenResponse>>
    
}