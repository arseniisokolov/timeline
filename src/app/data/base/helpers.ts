/** Выдает случайный ID */
export function getGuid() {
    return `f${(~~(Math.random() * 1e8)).toString(16)}`;
}

/** Форматирует дату в HH:MM:SS */
export function getFormattedTime(value: Date | string): string {
    if (!value)
        return '';
    const date = typeof value === 'string' ? new Date(value) : value;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

/** Форматирует дату в DD.MM.YYYY */
export function getFormattedDate(value: Date | string): string {
    if (!value)
        return '';
    const date = typeof value === 'string' ? new Date(value) : value;
    const year = date.getFullYear();
    let day = date.getDay().toString();
    let month = (date.getMonth() + 1).toString();
    if (day.length === 1) {
        day = '0' + day;
    }
    if (month.length === 1) {
        month = '0' + month;
    }
    return `${day}.${month}.${year}`;
}

/** Выдает рандомное число в указанном промежутке (включительно) */
export function getRandomInt(min: number, max: number): number {
    return parseFloat((min - 0.5 + Math.random() * (max - min + 1)).toFixed(2));
}

/** Проверяет, передано ли число, и переводит в число, если была передана строка. В случае ошибки возвращает undefined */
export function parseNumber(data: number | string): number {
    if (data === null || data === undefined || isNaN(data as number))
        return undefined;
    if (typeof data === 'number') {
        return data;
    }
    if (typeof data === 'string') {
        const parsed = parseFloat(data);
        return isNaN(parsed) ? undefined : parsed;
    };
}

/** Выдает true с переданной вероятностью
 * @param value вероятность в виде дроби
 */
export function checkPropability(value: number): boolean {
    if (!value)
        return false;
    return Math.round(getRandomInt(1, 1 / value)) === 1;
}

/** Блокирует событие и останавливает его распространение */
export function stopPropagation(event: Event) {
    if (!event)
        return;
    event.preventDefault();
    event.stopPropagation();
}

/** Группирует элементы массива по переданному ключу */
export function groupBy<T, TKey>(src: T[], fieldFnc: (item: T) => TKey): Array<IGrouping<TKey, T>> {
    const groupedItems: Array<IGrouping<TKey, T>> = [];
    let index = 0;
    while (index <= src.length - 1) {
        let groupCode = fieldFnc(src[index]);
        const grouping: IGrouping<TKey, T> = { Key: groupCode, Values: [] };
        while (!!src[index] && groupCode === fieldFnc(src[index]) && index <= src.length - 1) {
            groupCode = fieldFnc(src[index]);
            grouping.Values.push(src[index]);
            index++;
        }
        if (groupedItems.filter(i => i.Key === grouping.Key).length !== 0)
            groupedItems.map(i => i.Key === grouping.Key ? grouping.Values.map(g => i.Values.push(g)) : i.Values);
        else
            groupedItems.push(grouping);
    }
    return groupedItems;
}


interface IGrouping<TKey, TElement> {
    Key: TKey;
    Values: TElement[];
}

