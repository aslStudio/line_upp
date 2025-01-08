import React, {useCallback, useEffect, useMemo, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {clsx} from "clsx"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {Color} from "@/entities/color/model"
import {ColorSelect} from "@/entities/color/ui"
import {Project, SubGroup} from "@/entities/projects/model"
import {EventTypeCheckList} from "@/entities/events/ui"
import {OrderStatusCheckList} from "@/entities/events/ui/OrderStatusCheckList"

import {BottomSheet, useModal} from "@/shared/ui/BottomSheet"
import {Icon} from "@/shared/ui/Icon"
import {Button} from "@/shared/ui/Button"
import {TransitionFade} from "@/shared/ui/TransitionFade"
import {Collapse} from "@/shared/ui/Collapse"
import {EventType, OrderStatus} from "@/shared/api/enum.ts"
import {CollapseRadio} from "@/shared/ui/CollapseRadio";

import styles from './ProjectFilterButton.module.scss'
import {projectFiltersModel} from "@/features/project/model";

export const ProjectFilterButton: React.FC = () => {
    const { filters } = useSelector((state: RootState) => state.projectFilters)

    const { isOpen, open, close } = useModal()

    const isFiltered = useMemo(() => {
        return Object.values(filters).reduce((prev, curr) => {
            if (Array.isArray(curr)) {
                return prev || !!curr.length
            }

            return prev || !!curr
        }, false)
    }, [filters])

    return (
        <>
            <button
                className={clsx(
                    styles.root,
                )}
                onClick={open}
            >
                <div className={styles.content}>
                    <Icon
                        key={'isFocused'}
                        name={'filter'}
                        view={'placeholder'}
                        size={24}
                    />
                    {isFiltered && (
                        <p>1</p>
                    )}
                </div>
            </button>
            <FiltersModal
                isOpen={isOpen}
                setIsOpen={close}
            />
        </>
    )
}

const FiltersModal: React.FC<{
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}> = ({
          isOpen,
          setIsOpen,
      }) => {
    const { filters } = useSelector((state: RootState) => state.projectFilters)
    const dispatch = useDispatch<AppDispatch>()

    const [color, setColor] = useState<Color[]>([])
    const [subgroup, setSubgroup] = useState<SubGroup[]>([])
    const [eventType, setEventType] = useState<EventType[]>([])
    const [orderStatus, setOrderStatus] = useState<OrderStatus[]>([])

    const isFiltered = useMemo(() => {
        return (
            !!color.length ||
            !!subgroup.length ||
            !!eventType.length ||
            !!orderStatus.length
        )
    }, [color, subgroup, eventType, orderStatus])

    const initLocalValuesHandler = useCallback(() => {
        setColor(filters.color)
        setSubgroup(filters.subgroup)
        setEventType(filters.eventType)
        setOrderStatus(filters.orderStatus)
    }, [filters])

    const onSubmit = useCallback(() => {
        dispatch(projectFiltersModel.actions.setFilters({
            color,
            subgroup,
            eventType,
            orderStatus,
        }))

        setIsOpen(false)
    }, [color, subgroup, eventType, orderStatus])

    const onReset = useCallback(() => {
        dispatch(projectFiltersModel.actions.resetFilters())
        initLocalValuesHandler()
    }, [])

    useEffect(() => {
        if (isOpen) {
            initLocalValuesHandler()
        }
    }, [isOpen]);

    return (
        <BottomSheet
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <div className={styles.filters}>
                <div className={styles['filters-header']}>
                    <p>Фильтр</p>
                    <div className={styles['close-wrapper']}>
                        <TransitionFade>
                            {isFiltered && (
                                <button
                                    className={styles['reset-button']}
                                    onClick={onReset}
                                >
                                    Сбросить
                                </button>
                            )}
                        </TransitionFade>
                        <button
                            className={styles['close-button']}
                            onClick={() => setIsOpen(false)}
                        >
                            <Icon
                                name={'cross-icon'}
                                view={'placeholder'}
                                size={20}
                            />
                        </button>
                    </div>
                </div>
                <div className={styles.colors}>
                    <p>Цвет</p>
                    <ColorSelect
                        value={color}
                        setValue={setColor}
                    />
                </div>
                {filters.project && filters.project.subgroups.length > 0 && (
                    <CollapseRadio
                        title={filters.project.name}
                        data={filters.project.subgroups}
                        value={subgroup}
                        setValue={v => {
                            setSubgroup(toSubGroups(v as SubGroup[], filters.project!.id))
                        }}
                    />
                )}
                <Collapse
                    title={'Типы событий'}
                    initValue={!!eventType.length}
                >
                    <EventTypeCheckList
                        value={eventType}
                        setValue={setEventType}
                    />
                </Collapse>
                <Collapse
                    title={'Статус события'}
                    initValue={!!eventType.length}
                >
                    <OrderStatusCheckList
                        value={orderStatus}
                        setValue={setOrderStatus}
                    />
                </Collapse>
                <Button
                    className={styles.button}
                    view={'brand'}
                    isDisabled={!isFiltered}
                    onClick={onSubmit}
                >
                    {isFiltered ? 'Применить' : 'Выберите хотя бы 1 фильтр'}
                </Button>
            </div>
        </BottomSheet>
    )
}

function toSubGroups(groups: SubGroup[], id: Project['id']) {
    return groups.reduce((prev, curr) => [
        ...prev,
        {
            ...curr,
            projectId: id,
        }
    ], [] as SubGroup[])
}