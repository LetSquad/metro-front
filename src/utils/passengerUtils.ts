const ruRules = new Intl.PluralRules("ru-RU");

const passengersSuffixes = new Map([
    ["one", "пассажир"],
    ["few", "пассажира"],
    ["many", "пассажиров"]
]);

export const formatPassengersCount = (passengersCount: number) => {
    const rule = ruRules.select(passengersCount);

    return `${passengersCount} ${passengersSuffixes.get(rule)}`;
};
