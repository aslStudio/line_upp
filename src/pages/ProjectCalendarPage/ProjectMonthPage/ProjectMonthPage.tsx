import {MonthCalendar, MonthCalendarSkeleton} from "@/widgets/calendar"

import {useEventsProjectFetch} from "@/features/project/hooks"

import {TransitionFade} from "@/shared/ui/TransitionFade"

export const ProjectMonthPage = () => {
    const {
        isPending,
        isFetching,
        data,
        onFetchNext,
    } = useEventsProjectFetch()

    return (
        <TransitionFade>
            {!isPending && (
                <MonthCalendar
                    key={'Pending'}
                    days={data}
                    isFetching={isFetching}
                    onScrollEnd={onFetchNext}
                />
            )}
            {isPending && (
                <MonthCalendarSkeleton
                    key={'Content'}
                />
            )}
        </TransitionFade>
    )
}