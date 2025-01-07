import {MonthCalendar, MonthCalendarSkeleton} from "@/widgets/calendar"

import {useEventsScheduleFetch} from "@/features/schedule/hooks"

import {TransitionFade} from "@/shared/ui/TransitionFade"

export const ScheduleMonthPage = () => {
    const {
        isPending,
        isFetching,
        data,
        onFetchNext,
    } = useEventsScheduleFetch()

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