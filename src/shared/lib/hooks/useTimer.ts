import { useState } from "react"

import { TimeStamp } from "@/shared/lib"

let interval: NodeJS.Timeout;

export const useTimer = () => {
    const [timer, setTimer] = useState(0)

    function initTimer(ms: TimeStamp) {
        setTimer(ms)
        interval = setInterval(() => {
            setTimer(prevState => {
                if (prevState > 0) {
                    return prevState - 1
                } else {
                    clearInterval(interval)
                    return prevState
                }
            })
        }, 1000)
    }

    return {
        timer,
        initTimer,
    }
}