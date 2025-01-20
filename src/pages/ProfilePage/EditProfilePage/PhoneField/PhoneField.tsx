import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import {InputEditField} from "@/shared/ui/fields/InputEditField"
import {usePatchViewer} from "@/features/viewer/hooks";

export const PhoneField = () => {
    const {
        data
    } = useSelector((state: RootState) => state.viewer)
    const {
        isUpdating,
        updateField
    } = usePatchViewer()

    return (
        <InputEditField
            label={'Телефон'}
            value={data.phone}
            mask={'phone'}
            isLoading={isUpdating}
            setValue={phone => updateField({ phone })}
        />
    )
}