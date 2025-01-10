import React, {createContext, useContext, useState} from "react";
import {getCurrentMonth} from "@/shared/lib/date.ts";

type Context = {
    title: string
    setTitle: (title: string) => void
}

const commonHeaderContext = createContext<Context>({
    title: getCurrentMonth(),
    setTitle: () => {}
})

export const CommonHeaderProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [title, setTitle] = useState(getCurrentMonth())

    return (
        <commonHeaderContext.Provider
            value={{
                title,
                setTitle
            }}
        >
            {children}
        </commonHeaderContext.Provider>
    )
}

export const useCommonHeaderContext = () => useContext(commonHeaderContext)