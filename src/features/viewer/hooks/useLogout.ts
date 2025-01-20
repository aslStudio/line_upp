import {tokenModel} from "@/shared/model";

export const useLogout = () => {
    function logout() {
        tokenModel.clearTokens()
    }

    return {
        logout
    }
}