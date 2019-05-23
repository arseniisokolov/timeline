import { Observable, forkJoin, of } from "rxjs";
import { map, first } from "rxjs/operators";
import { TimelineDocTypes } from "../base/timeline-doctypes.enum";
import { LocalStorageAdapter } from "./local-storage.adapter";
import { ITimelineEvent, TimelineEventModel } from "../base/timeline-event.model";
import { timelineModelsFabric } from "../base/timeline-model-fabric";
import { Helpers } from "../base/helpers";

export class TimelineEventsService {

    private _localStorage: LocalStorageAdapter<ITimelineEvent>;

    constructor() {
        this._localStorage = new LocalStorageAdapter<ITimelineEvent>();
        this._localStorage.post(TimelineDocTypes.Transaction.toLowerCase(), mock[TimelineDocTypes.Transaction.toLowerCase()]).subscribe();
        this._localStorage.post(TimelineDocTypes.News.toLowerCase(), mock[TimelineDocTypes.News.toLowerCase()]).subscribe();
    }

    public getItems(docTypes: TimelineDocTypes[]): Observable<TimelineEventModel[]> {
        return forkJoin(
            docTypes.map(docType =>
                this._localStorage.get(docType.toLowerCase()).pipe(
                    map(items => timelineModelsFabric(docType, items))
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

}

const mock = {
    news: [
        {
            id: Helpers.getGuid(),
            extract: 'Новость года 2018',
            isVisited: false,
            description: 'Новость года 2018Новость года 2018Новость года 2018Новость года 2018Новость года 2018Новость года 2018',
            docDate: new Date('2018-01-01').getTime()
        },
        {
            id: Helpers.getGuid(),
            extract: 'Новость года 2019',
            isVisited: true,
            description: 'Новость года 2019Новость года 2018Новость года 2018Новость года 2018Новость года 2018Новость года 2018',
            docDate: new Date('2019-01-01').getTime()
        },
    ],
    transaction: [
        {
            id: Helpers.getGuid(),
            isDebet: false,
            amount: 123.422,
            senderName: 'Петр',
            currency: 'RUB',
            description: 'Это тебе',
            docDate: new Date().getTime()
        },
        {
            id: Helpers.getGuid(),
            isDebet: true,
            amount: 0.32,
            senderName: 'Иван',
            currency: 'USD',
            description: 'Это тебе!',
            docDate: new Date('2018-01-02').getTime()
        }
    ]
};