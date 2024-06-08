# metro-front

Модуль metro-front предназначен для вывода в браузере системы мониторинга и адаптивного распределения заявок на обслуживание в метро Москвы от маломобильных пассажиров.
Все данные о заявках, пасажирах и работниках запрашиваются из модуля metro-back по протоколу HTTP (или HTTPS) в формате JSON.
Информация для отслеживания изменений в режиме реального времени запрашиваются из модуля metro-back по протоколу WebSocket

Адрес приложения, развёрнутого в Cloud:

https://let-squad.ru/

## Предустановки
1. Нужно предустановить node >= 20.x
2. Должен быть установлен совместимый npm
3. В терминале выполнить команду npm install из папки проекта
5. Перед сборкой приложения необходимо в package.json установить значения для переменной окружения: EXTERNAL_URL (URL запущенного модуля metro-back).

## Линтеры
Для слежения за качеством кода в проекте предусмотрено подключение линтеров.

### ESLint
Для поддержки ESLint на уровне IntelliJ Idea необходимо включить его в настройках IDE. В качестве файла конфигурации
указать файл `/.eslintrc`; в качестве рабочей директории `metro-front`

Проверка кода с помощью ESLint стартует командой `npm run eslint`.

### Stylelint
Для поддержки Stylelint на уровне IntelliJ Idea необходимо включить его в настройках IDE. В качестве файла конфигурации
указать файл `/.stylelintrc.json`

Проверка кода с помощью Stylelint стартует командой `npm run stylelint`.

## Сборки

### Сборка для разработки
Стартовать сборку для отладки командой `npm run dev`.

После успешного выполнения команд будет запущен Webpack Dev Server и автоматически откроется вкладка в браузере
с приложением metro-front по адресу `localhost:8888`.
Собранный проект хранится в оперативной памяти. Каждое изменение кода инициирует обновление страницы автоматически.
Доступны Chrome Dev Tools и Redux Dev Tools

Также, можно запустить сборку со встроенными моками для ряда запросов, что позволит проверить некоторый фунциконал не используя модуль metro-back.
Для этого необходимо стартовать сборку командой `npm run dev:local"`.

### Релизная сборка
Стартовать релизную сборку командой `npm run build`.

Перед сборкой автоматически запускается проверка кода с помощью ESLint.
В случае успешной сборки приложения в рабочей директории будет создана поддиректория `dist` с приложением,
а в лог будет выведено сообщение вида:

`webpack 5.91.0 compiled`

Полученное содержимое директории dist можно добавить на любой веб-сервер в качестве статического контента.
В случае использования в качестве веб-сервера модуля metro-back, необходимо добавить в его classpath директорию
public со сборкой приложения metro-front.
В собранном приложении будут недоступны Chrome Dev Tools и Redux Dev Tools
