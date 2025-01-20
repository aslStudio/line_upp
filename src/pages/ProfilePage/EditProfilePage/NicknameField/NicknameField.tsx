import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import {usePatchViewer} from "@/features/viewer/hooks"

import {InputEditField} from "@/shared/ui/fields/InputEditField"

export const NicknameFieldInput = () => {
    const {
        data
    } = useSelector((state: RootState) => state.viewer)
    const {
        isUpdating,
        updateField
    } = usePatchViewer()

    return (
        <InputEditField
            label={'Имя'}
            value={data.name}
            isLoading={isUpdating}
            setValue={name => updateField({ name })}
        />
    )
}