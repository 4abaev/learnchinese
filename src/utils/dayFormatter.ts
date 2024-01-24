export function geneareWordFromDayNumber(day: number) {
    const res = day % 10;
    switch (res) {
    case 1:
        return `${day} день`;
    case 2:
    case 3:
    case 4:
        return `${day} дня`;
    case 0:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
        return `${day} дней`;
    }
}
