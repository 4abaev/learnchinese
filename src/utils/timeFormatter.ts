export const formatTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export function convertToMoscowTime(createdAt: string | undefined | null): string {
    if (!createdAt) {
        return 'N/A';
    }

    const date = new Date(createdAt);

    date.setHours(date.getHours() + 3);

    return date
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\.\d+Z$/, '');
}
