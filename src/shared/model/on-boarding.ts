const ON_BOARDING_STORAGE = 'ON_BOARDING_STORAGE'

function getIsOnBoarding() {
    return localStorage.getItem(ON_BOARDING_STORAGE) === 'true'
}

function setIsOnBoarding() {
    localStorage.setItem(ON_BOARDING_STORAGE, 'true')
}

export const onBoardingModel = {
    getIsOnBoarding,
    setIsOnBoarding
}