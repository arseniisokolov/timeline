import { Observable, forkJoin, interval } from "rxjs";
import { map, first } from "rxjs/operators";
import { TimelineDocTypes } from "../base/timeline-doc-types.enum";
import { ITimelineEvent, TimelineEventModel } from "../base/timeline-event.model";
import { Randomizer } from "./randomizer";
import { TimelineEventFabric } from "../base/timeline-event.fabric";
import { LocalStorageAdapter } from "../../../core-library/core/services/local-storage.adapter";

export class TimelineEventsService {

    private _localStorage: LocalStorageAdapter<ITimelineEvent>;
    /** Хеш id последних записей для каждого из типов документов */
    private _lastIdsCache: { [key: string]: string } = {};

    constructor() {
        this._localStorage = new LocalStorageAdapter<ITimelineEvent>();
        this.generateMockRequests();
    }

    /** Выдает записи указанных типов
     * @param onlyLatest будут выданы только последние записи (обновления отслеживаются автоматически)
     */
    public getItems(docTypes: TimelineDocTypes[], onlyLatest?: boolean): Observable<TimelineEventModel[]> {
        return forkJoin(
            docTypes.map(docType =>
                this._localStorage.get(docType.toLowerCase()).pipe(
                    map(items => {
                        if (!items)
                            return;
                        return TimelineEventFabric.create(docType, this.handleLatest(onlyLatest, items, docType));
                    })
                )
            )
        ).pipe(
            map(results => {
                return results.reduce((acc, item) => [...acc, ...item]);
            }));
    }

    public getItemById(docType: TimelineDocTypes, id: string): Observable<TimelineEventModel> {
        return this.getItems([docType]).pipe(
            first(),
            map(items => items.find(i => i.Id === id)),
        );
    }

    public updateItem(docType: TimelineDocTypes, item: ITimelineEvent): Observable<void> {
        return this._localStorage.update(docType.toLowerCase(), item);
    }

    public deleteItem(docType: TimelineDocTypes, id: string): Observable<void> {
        return this._localStorage.delete(docType.toLowerCase(), id);
    }


    /** Выдает только последние записи */
    private handleLatest(isOnlyLatest: boolean, items: ITimelineEvent[], docType: TimelineDocTypes): ITimelineEvent[] {
        let filteredItems = items;
        if (isOnlyLatest) {
            if (this._lastIdsCache[docType]) {
                const index = items.findIndex(i => i.id === this._lastIdsCache[docType]);
                filteredItems = index > -1 ? items.slice(index + 1) : items;
            }
        }
        if (filteredItems.length)
            this._lastIdsCache[docType] = filteredItems[filteredItems.length - 1].id;
        return filteredItems;
    }

    /** Генерирует случайные записи с опр. интервалом и записывает в local storage */
    private generateMockRequests() {
        const randomizer = new Randomizer();
        interval(10000).subscribe(() => {
            randomizer.getRandomData(TimelineDocTypes.Transaction).subscribe(data => {
                this._localStorage.post(TimelineDocTypes.Transaction.toLowerCase(), [data]).subscribe();
            });
            randomizer.getRandomData(TimelineDocTypes.News).subscribe(data => {
                this._localStorage.post(TimelineDocTypes.News.toLowerCase(), [data]).subscribe();
            });
        })
    }

}