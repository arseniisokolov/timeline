import { Observable, forkJoin, of } from "rxjs";
import { map, first } from "rxjs/operators";
import { TimelineDocTypes } from "../base/timeline-doctypes.enum";
import { LocalStorageAdapter } from "./local-storage.adapter";
import { ITimelineEvent, TimelineEventModel } from "../base/timeline-event.model";
import { timelineModelsFabric } from "../base/timeline-model-fabric";

export class TimelineEventsService {

    private _localStorage: LocalStorageAdapter<ITimelineEvent>;

    constructor() {
        this._localStorage = new LocalStorageAdapter<ITimelineEvent>()
    }

    public getItems(docTypes: TimelineDocTypes[]): Observable<TimelineEventModel[]> {
        return forkJoin(
            // docTypes.map(docType => this._localStorageAdapter.get(docType.toLowerCase()).pipe(
            docTypes.map(docType => of(mock[docType.toLowerCase()]).pipe(
                map(items => timelineModelsFabric(docType, items))
            ))
        ).pipe(
            map(results => {
                console.log(results);
                return results.reduce((acc, item) => [...acc, ...item]);
            }));
    }

    public getItemById(docType: TimelineDocTypes, id: string): Observable<TimelineEventModel> {
        return this.getItems([docType]).pipe(
            first(),
            map(items => items.find(i => i.Id === id))
        );
    }

    public updateItem(docType: TimelineDocTypes, item: ITimelineEvent): Observable<void> {
        return this._localStorage.update(docType, item);
    }

    public deleteItem(docType: TimelineDocTypes, id: string): Observable<void> {
        return this._localStorage.delete(docType, id);
    }

}

const mock = {
    news: [
        {
            id: '1',
            extract: 'Новость года 2018',
            isVisited: false,
            description: 'Новость года 2018Новость года 2018Новость года 2018Новость года 2018Новость года 2018Новость года 2018',
            docDate: new Date().getTime()
        },
        {
            id: '2',
            extract: 'Новость года 2019',
            isVisited: true,
            description: 'Новость года 2019Новость года 2018Новость года 2018Новость года 2018Новость года 2018Новость года 2018',
            docDate: new Date().getTime()
        },
    ],
    transaction: [
        {
            id: '1',
            isDebet: false,
            amount: 123.422,
            senderName: 'Петр',
            currency: 'RUB',
            description: 'Это тебе',
            docDate: new Date().getTime()
        },
        {
            id: '2',
            isDebet: true,
            amount: 0.32,
            senderName: 'Иван',
            currency: 'USD',
            description: 'Это тебе!',
            docDate: new Date().getTime()
        }
    ]
};