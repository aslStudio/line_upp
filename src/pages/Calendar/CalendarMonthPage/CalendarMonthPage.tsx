import {MonthCalendar, MonthCalendarSkeleton} from "@/widgets/calendar"

import {useEventsCalendarFetch} from "@/features/events/hooks"

import {TransitionFade} from "@/shared/ui/TransitionFade"

export const CalendarMonthPage = () => {
    const {
        isPending,
        isFetching,
        data,
        onFetchNext,
    } = useEventsCalendarFetch()

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