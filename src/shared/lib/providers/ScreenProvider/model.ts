import { Screen } from "./types";

export function getScreen(): Screen {
    const widthScreen = window.innerWidth;
    return {
        isDesktop: widthScreen >= 1200,
        isTablet: widthScreen < 1200 && widthScreen >= 769,
        isMobile: widthScreen < 769,
    };
}
