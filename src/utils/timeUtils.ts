const ruRules = new Intl.PluralRules("ru-RU");

const minutesSuffixes = new Map([
    ["one", "минута"],
    ["few", "минуты"],
    ["many", "минут"]
]);

export const formatMinutesCount = (minutes: number) => {
    const roundMinutes = Math.round(minutes);
    const rule = ruRules.select(roundMinutes);

    return `${roundMinutes} ${minutesSuffixes.get(rule)}`;
};

export const HOUR_DIVISION = [0, 15, 30, 45];

export const HOURS_OF_DAY_ARRAY = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0];

export const HOURS_OF_DAY_FORMAT_ARRAY = HOURS_OF_DAY_ARRAY.map((hour) => {
    return hour.toString().length === 1 ? `0${hour}` : hour.toString();
});

export const HOUR_DIVISION_FORMAT_ARRAY = HOUR_DIVISION.map((minutes) => {
    return minutes.toString().length === 1 ? `0${minutes}` : minutes.toString();
});
