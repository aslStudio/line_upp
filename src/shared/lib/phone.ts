export function formatPhoneNumber(phoneNumber: string): string {
    if (!/^\+7\d{10}$/.test(phoneNumber)) {
        throw new Error('Invalid phone number format')
    }

    const countryCode = phoneNumber.slice(0, 2)
    const part1 = phoneNumber.slice(2, 5)
    const part4 = phoneNumber.slice(10)

    return `${countryCode} ${part1} *** ** ${part4}`
}

export function toButtifyPhone(phoneNumber: string) {
    if (!/^\+7\d{10}$/.test(phoneNumber)) {
        throw new Error('Invalid phone number format')
    }

    const countryCode = phoneNumber.slice(0, 2)
    const part1 = phoneNumber.slice(2, 5)
    const part2 = phoneNumber.slice(5, 8)
    const part3 = phoneNumber.slice(8, 10)
    const part4 = phoneNumber.slice(10)

    return `${countryCode} ${part1} ${part2} ${part3} ${part4}`
}