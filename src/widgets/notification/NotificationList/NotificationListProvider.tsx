import React, {createContext, useContext, useRef} from "react";

type Context = {
    listRef: React.RefObject<HTMLDivElement>
}

const notificationListContext = createContext<Context>({
    listRef: React.createRef(),
})

export const NotificationListProvider: React.FC<React.PropsWithChildren> = ({
    children
}) => {
    const listRef = useRef<HTMLDivElement | null>(null)

    return (
        <notificationListContext.Provider
            value={{
                listRef,
            }}
        >
            {children}
        </notificationListContext.Provider>
    )
}

export const useNotificationListContext = () => useContext(notificationListContext)