import React, { createContext, useContext, useState } from "react"
import { Location, useLocation } from "react-router-dom"

type RouterClass = 'fade-in' | 'fade-out'

type Context = {
    displayLocation: Location
    rootClass: RouterClass
    authClass: RouterClass
    mainClass: RouterClass
    eventsClass: RouterClass
    scheduleClass: RouterClass
    projectClass: RouterClass
    setRootClass: (v: RouterClass) => void
    setAuthClass: (v: RouterClass) => void
    setMainClass: (v: RouterClass) => void
    setScheduleClass: (v: RouterClass) => void
    setEventsClass: (v: RouterClass) => void
    setProjectClass: (v: RouterClass) => void
    setDisplayLocation: (v: Location) => void
}

const routeTransitionContext = createContext<Context>({
    displayLocation: {} as Location,
    rootClass: 'fade-in',
    authClass: 'fade-in',
    mainClass: 'fade-in',
    scheduleClass: 'fade-in',
    eventsClass: 'fade-in',
    projectClass: 'fade-in',
    setRootClass: () => {},
    setAuthClass: () => {},
    setMainClass: () => {},
    setEventsClass: () => {},
    setScheduleClass: () => {},
    setProjectClass: () => {},
    setDisplayLocation: () => {},
})

export const RouteTransitionProvider: React.FC<React.PropsWithChildren> = ({
    children
}) => {
    const location = useLocation()

    const [displayLocation, setDisplayLocation] = useState<Location>(location)
    const [rootClass, setRootClass] = useState<RouterClass>('fade-in')
    const [authClass, setAuthClass] = useState<RouterClass>('fade-in')
    const [mainClass, setMainClass] = useState<RouterClass>('fade-in')
    const [scheduleClass, setScheduleClass] = useState<RouterClass>('fade-in')
    const [eventsClass, setEventsClass] = useState<RouterClass>('fade-in')
    const [projectClass, setProjectClass] = useState<RouterClass>('fade-in')
    
    return (
        <routeTransitionContext.Provider
            value={{
                displayLocation,
                rootClass,
                authClass,
                mainClass,
                scheduleClass,
                projectClass,
                eventsClass,
                setRootClass,
                setAuthClass,
                setMainClass,
                setScheduleClass,
                setEventsClass,
                setProjectClass,
                setDisplayLocation,
            }}
        >
            {children}
        </routeTransitionContext.Provider>
    )
}

export const useRouteTransitionContext = () => useContext(routeTransitionContext)