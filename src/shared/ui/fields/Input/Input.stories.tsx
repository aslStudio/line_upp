import {useState} from "react"
import {fn} from "@storybook/test"

import {Input, InputProps} from './Input'
import { masks } from './masks'

const meta = {
    title: 'Shared/fields/Input',
    component: Input,
    argTypes: {
        value: 'text',
        mask: {
            options: [
                undefined,
                ...Object.keys(masks)
            ],
            control: {
                type: 'select'
            },
        },
        isError: 'boolean',
        setValue: 'function',
    }
}

export default meta

export const Default = {
    args: {
        value: '',
        mask: 'none',
        isError: false,
        setValue: fn(),
    },
    render: function Render(args: InputProps) {
        const [value, setValue] = useState(args.value)

        return (
            <Input
                {...args}
                value={value}
                setValue={v => {
                    console.log(v)
                    setValue(v)
                }}
            />
        )
    }
}