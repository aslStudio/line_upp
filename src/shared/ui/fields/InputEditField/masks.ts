import {SelectionRange} from "@maskito/core/src/lib/types";

export const masks = {
    phone: {
        options: {
            mask: [
                '+',
                '7',
                ' ',
                /\d/,
                /\d/,
                /\d/,
                ' ',
                /\d/,
                /\d/,
                /\d/,
                ' ',
                /\d/,
                /\d/,
                ' ',
                /\d/,
                /\d/,
            ],
        },
        unmaskFn: (v: string) => {
            return v.replace(/\s/g, '')
        },
    },
    number: {
        options: {
            mask: [
                /\d/
            ],
        },
        unmaskFn: (v: string) => v
    },
    price: {
        options: {
            mask: /^\d[\d\s]*(\.\d{0,2})?$/,
            preprocessor: ({ value, selection }: { value: string; selection: SelectionRange }) => {
                const cleanedValue = value.replace(/[^0-9.]/g, '');

                return {
                    value: cleanedValue,
                    selection,
                };
            },
            postprocessors: [
                ({ value, selection }: { value: string; selection: SelectionRange }) => {
                    const [integerPart, decimalPart = ''] = value.replace(/\s+/g, '').split('.');
                    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' '); // Разделитель тысяч

                    const formattedValue = `${formattedIntegerPart}${decimalPart ? '.' + decimalPart : ''}`;

                    const addedSpaces = (formattedIntegerPart.match(/\s/g) || []).length;
                    const prevSpaces = (value.slice(0, selection[0]).match(/\s/g) || []).length;
                    const newSelection = selection[0] + (addedSpaces - prevSpaces);

                    return {
                        value: formattedValue,
                        selection: [newSelection, newSelection] as SelectionRange, // Сохраняем позицию курсора
                    };
                },
            ],
        },
        unmaskFn: (v: string) => {
            return v.replace(/\s/g, '')
        }
    }
}