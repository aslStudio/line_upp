import { createContext, useContext, useEffect, useState } from "react";
import { Screen } from "./types";
import { getScreen } from "./model";

const ScreenContext = createContext<Screen>({
    isDesktop: false,
    isTablet: false,
    isMobile: false,
});

export const ScreenProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [screen, setScreen] = useState<Screen>(getScreen());
    useEffect(() => {
        const handleResize = () => setScreen(getScreen());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <ScreenContext.Provider value={screen}>
            {children}
        </ScreenContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useScreen = () => useContext(ScreenContext);
