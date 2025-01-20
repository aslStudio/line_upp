import {useSelector} from "react-redux";
import {RootState} from "@/app/store.tsx";
import {usePatchViewer} from "@/features/viewer/hooks";
import {InputEditField} from "@/shared/ui/fields/InputEditField";

export const AboutField = () => {
    const {
        data
    } = useSelector((state: RootState) => state.viewer)
    const {
        isUpdating,
        updateField
    } = usePatchViewer()

    return (
        <InputEditField
            label={'О себе'}
            value={data.about}
            isLoading={isUpdating}
            setValue={about => updateField({ about })}
        />
    )
}