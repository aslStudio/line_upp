import {OnBoardingLayout} from "@/shared/layouts";
import {images} from "@/shared/assets/images";

export const OnBoardingProjectsPage = () => (
    <OnBoardingLayout
        title={'Создавайте проекты и добавляйте события'}
        description={'На вкладке проекты вы можете создать и настроить проект с событиями!'}
        img={images.OnBoarding.Projects}
    />
)