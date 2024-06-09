export const MINUTES_OF_HOUR = 60;
export const HOUR_DIVISION = [0, 15, 30, 45];

export const HOURS_OF_DAY_ARRAY = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1];

export const HOURS_OF_DAY_FORMAT_ARRAY = HOURS_OF_DAY_ARRAY.map((hour) => {
    return hour.toString().length === 1 ? `0${hour}` : hour;
});
