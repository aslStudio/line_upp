import {OnBoardingLayout} from "@/shared/layouts";
import {images} from "@/shared/assets/images";

export const OnBoardingCalendarPage = () => (
    <OnBoardingLayout
        title={'Следите за событиями в удобном календаре'}
        description={'Создавайте свои проекты, добавляйте расписания, участвуйте в событиях!'}
        img={images.OnBoarding.Calendar}
    />
)