import {useDispatch} from "react-redux"

import {AppDispatch} from "@/app/store.tsx"

import {WeekCalendar, WeekCalendarSkeleton} from "@/widgets/calendar"

import {useEventsScheduleFetch} from "@/features/schedule/hooks"
import {createEventsModel} from "@/features/events/model"

import {useProjectNavigate} from "@/shared/lib/hooks"
import {TransitionFade} from "@/shared/ui/TransitionFade"
import {CreateEventPaths, EventsPaths, RootPaths} from "@/shared/lib"

export const ScheduleWeekPage = () => {
    const { navigate } = useProjectNavigate()

    const {
        isPending,
        isFetching,
        data,
        onFetchNext,
    } = useEventsScheduleFetch()
    const dispatch = useDispatch<AppDispatch>()

    return (
        <TransitionFade>
            {!isPending && (
                <WeekCalendar
                    key={'Pending'}
                    days={data}
                    withCreateButton={true}
                    isFetching={isFetching}
                    onScrollEnd={onFetchNext}
                    onClickAdd={() => {
                        dispatch(createEventsModel.actions.reset())
                        navigate(
                            RootPaths.EVENTS,
                            EventsPaths.CREATE,
                            CreateEventPaths.FORM,
                        )
                    }}
                />
            )}
            {isPending && (
                <WeekCalendarSkeleton
                    key={'Content'}
                />
            )}
        </TransitionFade>
    )
}