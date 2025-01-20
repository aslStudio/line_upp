import {useCallback, useState} from "react"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {viewerApi} from "@/shared/api/viewer"
import {viewerModel} from "@/entities/viewer/model";
import {ExpandViewer} from "@/entities/viewer/model/types.ts";

export const usePatchViewer = () => {
    const {
        data,
    } = useSelector((state: RootState) => state.viewer)
    const dispatch = useDispatch<AppDispatch>()

    const [isLoadingNickname, setIsLoadingNickname] = useState(false)
    const [isLoadingReminding, setIsLoadingReminding] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    const updateNicknameSearchAvailable = useCallback(() => {
        setIsLoadingNickname(true)
        viewerApi.patchViewer({
            canBeFindByNickname: !data.canBeFindByNickname,
        }).then(() => {
            dispatch(viewerModel.actions.update({
                canBeFindByNickname: !data.canBeFindByNickname,
            }))
            setIsLoadingNickname(false)
        })
    }, [data])

    const updateRemindingAvailable = useCallback(() => {
        setIsLoadingReminding(true)
        viewerApi.patchViewer({
            needReminding: !data.needReminding,
        }).then(() => {
            dispatch(viewerModel.actions.update({
                needReminding: !data.needReminding,
            }))
            setIsLoadingReminding(false)
        })
    }, [data])

    async function updateField(data: Partial<ExpandViewer>) {
        setIsUpdating(true)
        await viewerApi.patchViewer({
            ...data
        })
        dispatch(viewerModel.actions.update({
            ...data
        }))
        setIsUpdating(false)
    }

    return {
        data,

        isUpdating,
        isLoadingNickname,
        isLoadingReminding,

        updateNicknameSearchAvailable,
        updateRemindingAvailable,
        updateField,
    }
}