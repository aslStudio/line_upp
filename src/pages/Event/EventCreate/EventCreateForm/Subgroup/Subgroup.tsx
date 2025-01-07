import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {createEventsModel} from "@/features/events/model"

import {TransitionFade} from "@/shared/ui/TransitionFade"
import {Icon} from "@/shared/ui/Icon"
import {Cell} from "@/shared/ui/Cell"
import {CreateEventPaths, EventsPaths, RootPaths} from "@/shared/lib"
import {ButtonCell} from "@/shared/ui/ButtonCell"
import {useProjectNavigate} from "@/shared/lib/hooks"

import styles from './Subgroup.module.scss'

export const Subgroup = () => {
    const { navigate } = useProjectNavigate()

    const {
        data: { project, subgroup }
    } = useSelector((state: RootState) => state.createEvent)
    const dispatch = useDispatch<AppDispatch>()

    function onRemove() {
        dispatch(createEventsModel.actions.update({
            subgroup: null
        }))
    }

    if (project) {
        return (
            <div className={styles.root}>
                <p className={styles.title}>Подгруппа</p>
                <TransitionFade>
                    {!subgroup && (
                        <ButtonCell
                            iconStyles={{
                                transform: 'rotate(45deg)',
                            }}
                            icon={'cross-icon'}
                            onClick={() => {
                                navigate(
                                    RootPaths.EVENTS,
                                    EventsPaths.CREATE,
                                    CreateEventPaths.SUBGROUP,
                                )
                            }}
                        >
                            Добавить подгруппу
                        </ButtonCell>
                    )}
                    {subgroup && (
                        <Cell
                            key={'Value'}
                            className={styles.cell}
                            title={project.name}
                        >
                            <button
                                className={styles['remove-button']}
                                onClick={onRemove}
                            >
                                <Icon
                                    name={'minus'}
                                    view={'dark'}
                                    size={22}
                                />
                            </button>
                        </Cell>
                    )}
                </TransitionFade>
            </div>
        )
    }

    return null
}