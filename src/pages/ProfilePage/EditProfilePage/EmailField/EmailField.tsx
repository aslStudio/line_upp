import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import {usePatchViewer} from "@/features/viewer/hooks"

import {InputEditField} from "@/shared/ui/fields/InputEditField"

export const EmailField = () => {
    const {
        data
    } = useSelector((state: RootState) => state.viewer)
    const {
        isUpdating,
        updateField
    } = usePatchViewer()

    return (
        <InputEditField
            label={'Электронная почта'}
            value={data.email}
            isLoading={isUpdating}
            setValue={email => updateField({ email })}
        />
    )
}