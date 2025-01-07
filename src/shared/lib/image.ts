export function convertFileInputToBase64(event: React.ChangeEvent<HTMLInputElement>): Promise<string | null> {
    return new Promise((resolve, reject) => {
        const files = event.target.files;
        if (!files || files.length === 0) {
            resolve(null); // Если файл не выбран, возвращаем null
            return;
        }

        const file = files[0]; // Берем первый файл из выбранных
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.result && typeof reader.result === 'string') {
                resolve(reader.result); // Возвращаем строку Base64
            } else {
                reject(new Error('Ошибка при преобразовании в Base64'));
            }
        };

        reader.onerror = () => {
            reject(new Error('Ошибка чтения файла'));
        };

        reader.readAsDataURL(file); // Преобразуем файл в Base64
    });
}
