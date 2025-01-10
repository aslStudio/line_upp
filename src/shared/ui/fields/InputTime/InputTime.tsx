import React, {useCallback, useMemo} from "react"
import { MaskitoOptions } from "@maskito/core"
import { useMaskito } from "@maskito/react"
import {SelectionRange} from "@maskito/core/src/lib/types";

import { formatTime } from "@/shared/lib/date.ts"
import { PropsDefault, TimeStamp } from "@/shared/lib"

import styles from './InputTime.module.scss'
import {clsx} from "clsx";

// Определение типов пропсов
export type InputTimeProps = PropsDefault<{
    type: 'HH:MM' | 'HH h MM m'
    value: TimeStamp
    setValue: (value: TimeStamp) => void
}>

// Карта настроек для разных типов масок
const optionsMap: Record<InputTimeProps['type'], {
    options: MaskitoOptions
    toInputValue: (v: TimeStamp) => string
    inputToTS: (v: string, initDate: TimeStamp) => TimeStamp
}> = {
    'HH:MM': {
        options: {
            mask: [
                /\d/, // Первая цифра часов
                /\d/, // Вторая цифра часов
                ':',  // Разделитель
                /\d/, // Первая цифра минут
                /\d/, // Вторая цифра минут
            ],
            postprocessors: [
                ({ value, selection }) => {
                    let newValue = value.replace(/[^0-9:]/g, ''); // Удаляем все некорректные символы

                    // Разделяем строку на часы и минуты
                    const [hoursStr = '0', minutesStr = '0'] = newValue.split(':');
                    let hours = parseInt(hoursStr, 10);
                    let minutes = parseInt(minutesStr, 10);

                    // Ограничиваем значения часов и минут
                    hours = Math.min(Math.max(isNaN(hours) ? 0 : hours, 0), 23);
                    minutes = Math.min(Math.max(isNaN(minutes) ? 0 : minutes, 0), 59);

                    // Если строка ввода неполная (например, "12:1"), добавляем недостающие нули
                    const formattedHours = String(hours).padStart(2, '0');
                    const formattedMinutes = minutesStr.length === 1
                        ? String(minutes * 10).padStart(2, '0') // Умножаем на 10 для правильной обработки
                        : String(minutes).padStart(2, '0');

                    // Формируем строку заново
                    newValue = `${formattedHours}:${formattedMinutes}`;

                    const updatedSelection: SelectionRange = [
                        selection[0] !== null ? Math.min(selection[0], newValue.length) : null,
                        selection[1] !== null ? Math.min(selection[1], newValue.length) : null,
                    ] as SelectionRange;

                    return {
                        value: newValue,
                        selection: updatedSelection,
                    };
                },
            ],
        },
        toInputValue: v => formatTime(v), // Преобразование таймстампа в строку
        inputToTS: (v, initDate) => {
            const [hours, minutes] = v.split(':').map(Number);
            const date = new Date(initDate);

            if (!isNaN(hours)) {
                date.setHours(hours);
            }
            if (!isNaN(minutes)) {
                date.setMinutes(minutes); // Исправлено: setMinutes вместо setHours
            }

            return date.getTime();
        }
    },
    'HH h MM m': {
        options: {
            mask: [
                /\d/, // Первая цифра часов
                /\d/, // Вторая цифра часов
                ' ',  // Пробел
                'ч',  // Литерал 'ч'
                ' ',  // Пробел
                /\d/, // Первая цифра минут
                /\d/, // Вторая цифра минут
                ' ',  // Пробел
                'м',  // Литерал 'м'
            ],
            postprocessors: [
                ({ value, selection }) => {
                    // Удаляем некорректные символы, оставляем только цифры, пробелы и 'ч', 'м'
                    let newValue = value.replace(/[^0-9 чм]/g, '').trim();

                    // Регулярное выражение для извлечения частей времени
                    const match = newValue.match(/^(\d{1,2}) ч (\d{1,2}) м$/);
                    let hours = 0;
                    let minutes = 0;

                    if (match) {
                        // Извлекаем часы и минуты из строки
                        hours = parseInt(match[1], 10);
                        minutes = parseInt(match[2], 10);
                    } else {
                        // Если строка не соответствует формату, пытаемся разобрать часы и минуты вручную
                        const [hoursPart = '', minutesPart = ''] = newValue.split('ч').map(part => part.trim());
                        hours = parseInt(hoursPart, 10) || 0;

                        // Учитываем, что пользователь может вводить неполное значение минут
                        if (minutesPart) {
                            const minutesNumeric = parseInt(minutesPart.replace('м', ''), 10) || 0;
                            minutes = minutesPart.length === 1 ? minutesNumeric * 10 : minutesNumeric;
                        }
                    }

                    // Ограничиваем значения часов и минут
                    hours = Math.min(Math.max(hours, 0), 23);
                    minutes = Math.min(Math.max(minutes, 0), 59);

                    // Форматируем строку обратно в 'HH ч MM м'
                    const formattedHours = String(hours).padStart(2, '0');
                    const formattedMinutes = String(minutes).padStart(2, '0');
                    newValue = `${formattedHours} ч ${formattedMinutes} м`;

                    // Обновляем выделение
                    const updatedSelection: SelectionRange = [
                        selection[0] !== null ? Math.min(selection[0], newValue.length) : null,
                        selection[1] !== null ? Math.min(selection[1], newValue.length) : null,
                    ] as SelectionRange;

                    return {
                        value: newValue,
                        selection: updatedSelection,
                    };
                },
            ],
        },
        toInputValue: v => {
            const [hours, minutes] = formatTime(v).split(':');
            return `${String(hours).padStart(2, '0')} ч ${String(minutes).padStart(2, '0')} м`;
        },
        inputToTS: (v, initDate) => {
            const match = v.match(/^(\d{1,2}) ч (\d{1,2}) м$/);
            const date = new Date(initDate);

            if (match) {
                const hours = parseInt(match[1], 10);
                const minutes = parseInt(match[2], 10);

                if (!isNaN(hours)) {
                    date.setHours(hours);
                }
                if (!isNaN(minutes)) {
                    date.setMinutes(minutes);
                }
            }

            return date.getTime();
        }
    }
}

export const InputTime: React.FC<InputTimeProps> = ({
    className,
    type,
    value,
    setValue
}) => {
    const maskitoOptions = optionsMap[type].options;

    const ref = useMaskito({
        options: maskitoOptions,
    });

    const inputValue = useMemo(() => {
        return optionsMap[type].toInputValue(value)
    }, [value])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        const newTimeStamp = optionsMap[type].inputToTS(newValue, value)
        setValue(newTimeStamp)
    }, [setValue, value])

    return (
        <input
            className={clsx(
                className,
                styles.root,
            )}
            ref={ref}
            value={inputValue}
            onInput={handleChange}
        />
    )
}
