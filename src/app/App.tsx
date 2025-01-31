import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { CommonHeaderProvider, TabBar } from "@/widgets/common";

import { ThemeProvider, RouteTransitionProvider } from "@/shared/lib/providers";
import { useTelegram } from "@/shared/lib/hooks/useTelegram";

import { RouterView } from "./router";
import { StoreProvider } from "./store";
import { ScreenProvider } from "@/shared/lib/providers/ScreenProvider";
import { HeaderDesktop } from "@/widgets/common/HeaderDesktop";

function App() {
    const { expand, disableVerticalSwipes } = useTelegram();

    useEffect(() => {
        expand();
        disableVerticalSwipes();
    });

    return (
        <StoreProvider>
            <BrowserRouter>
                <ScreenProvider>
                    <ThemeProvider>
                        <CommonHeaderProvider>
                            <RouteTransitionProvider>
                                <HeaderDesktop />
                                <RouterView />
                                <TabBar />
                            </RouteTransitionProvider>
                        </CommonHeaderProvider>
                    </ThemeProvider>
                </ScreenProvider>
            </BrowserRouter>
        </StoreProvider>
    );
}

export default App;
