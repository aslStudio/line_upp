import {tokenApi, CreateTokenParams} from "@/shared/api/token"

export const TOKEN_ACCESS_STORAGE = 'TOKEN_ACCESS_STORAGE'
export const TOKEN_REFRESH_STORAGE = 'TOKEN_REFRESH_STORAGE'

function getAccessToken() {
    return localStorage.getItem(TOKEN_ACCESS_STORAGE)
}

function getRefershToken() {
    return localStorage.getItem(TOKEN_REFRESH_STORAGE)
}

async function createTokens(data: CreateTokenParams) {
    try {
        const { payload, error } = await tokenApi.create(data)

        if (payload && !error) {
            localStorage.setItem(TOKEN_ACCESS_STORAGE, payload.access)
            localStorage.setItem(TOKEN_REFRESH_STORAGE, payload.refresh)
            return {
                error: false
            }
        }

        return {
            error: true
        }
    } catch (e) {
        console.log(e)
        return {
            error: true
        }
    }
}

async function refreshToken() {
    try {
        const refreshToken = getRefershToken()
        if (refreshToken) {
            const { payload, error } = await tokenApi.refresh({
                refresh: refreshToken,
            })

            if (payload && !error) {
                localStorage.setItem(TOKEN_ACCESS_STORAGE, payload.access)
                return {
                    error: false
                }
            }

            return {
                error: true
            }
        }

        return {
            error: true
        }
    } catch (e) {
        console.log(e)
        return {
            error: true
        }
    }
}

function clearTokens() {
    localStorage.removeItem(TOKEN_ACCESS_STORAGE)
    localStorage.removeItem(TOKEN_REFRESH_STORAGE)
}

export const tokenModel = {
    getAccessToken,
    getRefershToken,
    createTokens,
    refreshToken,
    clearTokens,
}