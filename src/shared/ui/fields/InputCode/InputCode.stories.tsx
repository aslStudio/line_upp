import {useState} from "react"
import {fn} from "@storybook/test"

import {InputCode, InputCodeProps} from './InputCode.tsx'

const meta = {
    title: 'Shared/fields/InputCode',
    component: InputCode,
    argTypes: {
        value: 'text',
        isError: 'boolean',
        setValue: 'function',
        onFill: 'function',
    }
}

export default meta

export const Default = {
    args: {
        isError: false,
        onFill: fn(),
    },
    render: function Render(args: InputCodeProps) {
        const [value, setValue] = useState('')

        return (
            <InputCode
                value={value}
                isError={args.isError}
                setValue={setValue}
                onFill={args.onFill}
            />
        )
    }
}