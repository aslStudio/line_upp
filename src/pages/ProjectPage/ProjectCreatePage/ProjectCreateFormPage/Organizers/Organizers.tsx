import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {UserCell, UserCellList, UserProjectCell} from "@/entities/user/ui"

import {ButtonCell} from "@/shared/ui/ButtonCell"
import {TransitionFade} from "@/shared/ui/TransitionFade"
import {useProjectNavigate} from "@/shared/lib/hooks"

import styles from './Organizers.module.scss'
import {CreateProjectPaths, ProjectPaths, RootPaths} from "@/shared/lib";
import {createProjectModel} from "@/features/project/model";

export const Organizers = () => {
    const { navigate } = useProjectNavigate()

    const {
        data, errors
    } = useSelector((state: RootState) => state.createProject)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <div className={styles.root}>
            <UserCellList
                title={'Организаторы'}
                description={'Ответственные за мероприятие'}
                list={data.organizers}
                render={item => {
                    if (data.organizers.find(v => v.id === item.id)?.isCreator) {
                        return (
                            <UserCell
                                {...item}
                            />
                        )
                    } else {
                        return (
                            <UserProjectCell
                                {...item}
                                onCreator={() => {
                                    dispatch(createProjectModel.actions.makeCreator(item))
                                }}
                                onRemove={() => {
                                    dispatch(createProjectModel.actions.removeOrganizer(item))
                                }}
                            />
                        )
                    }
                }}
            />
            <ButtonCell
                iconStyles={{
                    transform: 'rotate(45deg)',
                }}
                icon={'cross-icon'}
                withHorizontalPadding={true}
                onClick={() => {
                    navigate(
                        RootPaths.PROJECTS,
                        ProjectPaths.CREATE,
                        CreateProjectPaths.ORGANIZER
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