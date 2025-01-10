import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {createEventsModel} from "@/features/events/model"

import {UserCellList, UserProjectCell} from "@/entities/user/ui"

import {ButtonCell} from "@/shared/ui/ButtonCell"
import {useProjectNavigate} from "@/shared/lib/hooks"
import {CreateEventPaths, EventsPaths, RootPaths} from "@/shared/lib"
import {TransitionFade} from "@/shared/ui/TransitionFade"

import styles from './Organizers.module.scss'

export const Organizers = () => {
    const {
        navigate
    } = useProjectNavigate()

    const {
        data, errors
    } = useSelector((state: RootState) => state.createEvent)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <div className={styles.root}>
            <UserCellList
                title={'Организаторы'}
                description={'Ответственные за мероприятие'}
                list={data.organizers}
                render={item => (
                    <UserProjectCell
                        {...item}
                        onRemove={() => {
                            dispatch(createEventsModel.actions.removeOrganizer(item))
                        }}
                    />
                )}
            />
            <ButtonCell
                iconStyles={{
                    transform: 'rotate(45deg)',
                }}
                icon={'cross-icon'}
                withHorizontalPadding={true}
                onClick={() => {
                    navigate(
                        RootPaths.EVENTS,
                        EventsPaths.CREATE,
                        CreateEventPaths.ORGANIZER,
                    )
                }}
            >
                Добавить
            </ButtonCell>
            <TransitionFade>
                {errors.organizers && (
                    <p className={styles.error}>Укажите организаторов</p>
                )}
            </TransitionFade>
        </div>
    )
}