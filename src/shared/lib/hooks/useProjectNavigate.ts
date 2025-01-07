import {useNavigate} from "react-router-dom";

export const useProjectNavigate = () => {
    const goToUrl = useNavigate()

    function navigate(...args: (string | number)[]) {
        goToUrl(args.join('/'))
    }

    function getPath(...args: (string | number)[]) {
        return args.join('/')
    }

    function goBack() {
        goToUrl(-1)
    }

    return {
        navigate,
        getPath,
        goBack,
    }
}