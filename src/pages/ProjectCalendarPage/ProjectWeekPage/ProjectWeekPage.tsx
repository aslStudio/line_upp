import {useDispatch} from "react-redux"

import {AppDispatch} from "@/app/store.tsx"

import {WeekCalendar, WeekCalendarSkeleton} from "@/widgets/calendar"

import {createEventsModel} from "@/features/events/model"
import {useEventsProjectFetch} from "@/features/project/hooks"

import {useProjectNavigate} from "@/shared/lib/hooks"
import {TransitionFade} from "@/shared/ui/TransitionFade"
import {CreateEventPaths, EventsPaths, RootPaths} from "@/shared/lib"

export const ProjectWeekPage = () => {
    const { navigate } = useProjectNavigate()

    const {
        isPending,
        isFetching,
        data,
        onFetchNext,
    } = useEventsProjectFetch()
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