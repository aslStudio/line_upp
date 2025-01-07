import fs from 'fs';
import path from 'path';
import { SVGIcons2SVGFontStream } from 'svgicons2svgfont';
import svg2ttf from 'svg2ttf';
import ttf2woff from 'ttf2woff';
import { exec } from 'child_process';  // Используем exec для выполнения команды woff2

// Папка с SVG файлами
const iconsDir = path.join(process.cwd(), 'src/shared/assets/icons');
const outputDir = path.join(process.cwd(), 'src/shared/assets/icon-font');
const scssOutputPath = path.join(process.cwd(), 'src/shared/assets/icon-font/icons.scss');  // Путь для SCSS файла
const tsOutputPath = path.join(process.cwd(), 'src/shared/assets/icon-font/icons.ts');  // Путь для TypeScript файла

// Генерация шрифта, SCSS и TypeScript файла
function generateIconFont() {
    const icons = fs.readdirSync(iconsDir)
        .filter(file => file.endsWith('.svg'))  // Фильтруем только SVG файлы
        .map(file => path.join(iconsDir, file));

    const font = new SVGIcons2SVGFontStream({
        fontName: 'custom-icon-font',
        normalize: true, // Нормализация размеров
        fontHeight: 1000,
        log: () => {}  // Отключаем логирование
    });

    // Генерация SCSS контента
    let scssContent = `@font-face {
    font-family: 'custom-icon-font';
    src:
        local('custom-icon-font'),
        url('./custom-icon-font.ttf') format('ttf'),
        url('./custom-icon-font.woff') format('woff'), 
        url('./custom-icon-font.svg') format('svg');
    font-weight: normal;
    font-style: normal;
  }\n\n`;

    // Массив для имен иконок
    const iconNames = [];

    // Слушаем события "data" и записываем шрифт в файл
    const svgFontPath = path.join(outputDir, 'custom-icon-font.svg');
    const writeStream = fs.createWriteStream(svgFontPath);
    font.pipe(writeStream);

    font.on('data', (chunk) => {
        writeStream.write(chunk);
    });

    font.on('end', () => {
        console.log('SVG шрифт успешно сгенерирован!');

        // Проверим, что файл не пустой и содержит данные
        fs.readFile(svgFontPath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Ошибка при чтении файла SVG: ${err}`);
                return;
            }
            if (!data || data.trim() === '') {
                console.error('Ошибка: файл SVG пуст!');
                return;
            }
            console.log('SVG файл успешно создан и содержит данные.');

            // После завершения записи SVG шрифта конвертируем в другие форматы
            convertSvgToOtherFormats(svgFontPath);
        });
    });

    // Добавляем иконки в шрифт и генерируем SCSS и TypeScript файлы
    icons.forEach((icon, index) => {
        const stream = fs.createReadStream(icon);

        // Извлекаем имя файла без расширения для использования в качестве имени глифа
        const glyphName = path.basename(icon, '.svg');  // Имя глифа = имя файла без расширения

        // Присваиваем уникальный unicode для каждой иконки
        stream.metadata = {
            name: glyphName,  // Задаем имя глифа
            unicode: [String.fromCharCode(index + 0xE001)]  // Присваиваем уникальный unicode
        };

        // Генерируем SCSS для этой иконки
        scssContent += `.icon-${glyphName}:before {
      content: "\\${(index + 0xE001).toString(16)}";
      font-family: 'custom-icon-font';
    }\n`;

        // Добавляем имя иконки в массив
        iconNames.push(glyphName);

        // Добавляем иконку в шрифт
        font.write(stream);
    });

    font.end();

    // Сохраняем SCSS файл
    fs.writeFileSync(scssOutputPath, scssContent);
    console.log('SCSS файл успешно сгенерирован: ', scssOutputPath);

    // Генерация TypeScript файла с массивом иконок
    const tsContent = `export const iconNames = ${JSON.stringify(iconNames, null, 2)} as const\n`;
    fs.writeFileSync(tsOutputPath, tsContent);
    console.log('TypeScript файл успешно сгенерирован: ', tsOutputPath);
}

// Функция для конвертации SVG шрифта в TTF, WOFF, WOFF2
function convertSvgToOtherFormats(svgFontPath) {
    // Проверяем, существует ли SVG файл перед запуском конвертации
    fs.access(svgFontPath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(`Ошибка: файл ${svgFontPath} не найден!`);
            return;
        }

        // Путь для вывода других форматов
        const ttfPath = path.join(outputDir, 'custom-icon-font.ttf');
        const woffPath = path.join(outputDir, 'custom-icon-font.woff');
        const woff2Path = path.join(outputDir, 'custom-icon-font.woff2');

        // Логируем путь к SVG файлу
        console.log(`Запуск конвертации SVG в TTF, WOFF и WOFF2: ${svgFontPath}`);

        // Используем svg2ttf для конвертации SVG в TTF
        const svgData = fs.readFileSync(svgFontPath, 'utf8');
        const ttfData = svg2ttf(svgData, {});
        fs.writeFileSync(ttfPath, Buffer.from(ttfData.buffer));

        console.log('TTF шрифт успешно сгенерирован:', ttfPath);

        // Конвертируем TTF в WOFF
        const woffData = ttf2woff(ttfData.buffer);
        fs.writeFileSync(woffPath, woffData);
        console.log('WOFF шрифт успешно сгенерирован:', woffPath);

        // Конвертируем TTF в WOFF2 с использованием woff2 CLI
        exec(`woff2_compress ${ttfPath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Ошибка при конвертации в WOFF2: ${stderr}`);
                return;
            }

            console.log('WOFF2 шрифт успешно сгенерирован:', woff2Path);
        });
    });
}

generateIconFont();
