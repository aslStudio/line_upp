import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {createEventsModel} from "@/features/events/model"

import {InputUnderline} from "@/shared/ui/fields/InputUnderline"

export const Info = () => {
    const { data, errors } = useSelector((state: RootState) => state.createEvent)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <div>
            <InputUnderline
                value={data.name}
                size={'l'}
                error={errors.name}
                errorMessage={'Укажите название события'}
                placeholder={'Название'}
                setValue={name => {
                    dispatch(createEventsModel.actions.update({ name }))
                }}
            />
            <InputUnderline
                value={data.description}
                size={'m'}
                error={errors.description}
                errorMessage={'Укажите описание события'}
                placeholder={'Описание'}
                maxLength={300}
                setValue={description => {
                    dispatch(createEventsModel.actions.update({ description }))
                }}
            />
            <InputUnderline
                value={data.comment}
                size={'m'}
                placeholder={'Комментарий'}
                maxLength={100}
                setValue={comment => {
                    dispatch(createEventsModel.actions.update({ comment }))
                }}
            />
        </div>
    )
}