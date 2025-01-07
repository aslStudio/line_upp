import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import {UserCell, UserCellList} from "@/entities/user/ui"

import {ButtonCell} from "@/shared/ui/ButtonCell"
import {useProjectNavigate} from "@/shared/lib/hooks"
import {CreateEventPaths, EventsPaths, RootPaths} from "@/shared/lib"

import styles from './Organizers.module.scss'
import {TransitionFade} from "@/shared/ui/TransitionFade";

export const Organizers = () => {
    const {
        navigate
    } = useProjectNavigate()

    const {
        data, errors
    } = useSelector((state: RootState) => state.createEvent)

    return (
        <div className={styles.root}>
            <UserCellList
                title={'Организаторы'}
                description={'Ответственные за мероприятие'}
                list={data.organizers}
                render={item => (
                    <UserCell
                        {...item}
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
                {errors.color && (
                    <p className={styles.error}>Укажите организаторов</p>
                )}
            </TransitionFade>
        </div>
    )
}