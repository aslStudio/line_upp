type CopyFn = (text: string) => boolean

export function useCopyToClipboard(): {
    copy: CopyFn
} {
    function copy(text: string): boolean {
        try {
            const textarea = document.createElement('textarea')
            document.body.style.setProperty('pointer-events', 'all')

            textarea.value = text

            textarea.style.position = 'fixed'
            textarea.style.top = '-9999px'
            textarea.style.left = '-9999px'

            document.body.appendChild(textarea)

            textarea.select();

            document.execCommand('copy')

            document.body.removeChild(textarea)
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }

    return {
        copy
    }
}