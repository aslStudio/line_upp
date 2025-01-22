import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/store.tsx";
import {ButtonCell} from "@/shared/ui/ButtonCell";
import {TransitionFade} from "@/shared/ui/TransitionFade";
import {CellList} from "@/shared/ui/CellList";
import {useCallback, useEffect} from "react";
import {createEventsModel} from "@/features/events/model";
import {Cell} from "@/shared/ui/Cell";
import {Icon} from "@/shared/ui/Icon";

import styles from './Project.module.scss'
import {projectsListModel} from "@/entities/projects/model";
import {useProjectNavigate} from "@/shared/lib/hooks";
import {CreateEventPaths, EventsPaths, RootPaths} from "@/shared/lib";

export const Project = () => {
    const { navigate } = useProjectNavigate()

    const {
        isPending,
        data,
    } = useSelector((state: RootState) => state.projectList)
    const {
        data: { project },
        errors,
    } = useSelector((state: RootState) => state.createEvent)
    const dispatch = useDispatch<AppDispatch>()

    const onSelect = useCallback((v: number | string) => {
        const active = data.find(item => item.id === v)

        if (active) {
            dispatch(createEventsModel.actions.update({
                project: active,
            }))
        }
    }, [data])

    function onRemove() {
        dispatch(createEventsModel.actions.update({
            project: null,
            subgroup: null,
        }))
    }

    useEffect(() => {
        dispatch(projectsListModel.thunks.getProjectsThunk())
    }, [])

    return (
        <div className={styles.root}>
            <p className={styles.title}>Проект</p>
            <TransitionFade>
                {errors.project && (
                    <p className={styles.error}>Укажите проект, либо создайте личное событие</p>
                )}
            </TransitionFade>
            <TransitionFade>
                {!project && (
                    <>
                        <ButtonCell
                            className={styles.button}
                            iconStyles={{
                                transform: 'rotate(45deg)',
                            }}
                            icon={'cross-icon'}
                            onClick={() => {
                                navigate(
                                    RootPaths.EVENTS,
                                    EventsPaths.CREATE,
                                    CreateEventPaths.PROJECT,
                                )
                            }}
                        >
                            Добавить проект
                        </ButtonCell>
                        <TransitionFade>
                            {!isPending && (
                                <CellList
                                    label={'Последние проекты'}
                                    data={data}
                                    onClick={onSelect}
                                />
                            )}
                        </TransitionFade>
                    </>
                )}
                {project && (
                    <Cell
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