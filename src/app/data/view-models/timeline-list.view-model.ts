import { TimelineEventModel } from "../base/timeline-event.model";
import { Helpers } from "../base/helpers";
import { TimelineDocTypes } from "../base/timeline-doc-types.enum";

export class TimelineListViewModel {

    public VisibleItems: TimelineEventModel[];
    public SortingMode: 'byDate' | 'byType';

    private _items: TimelineEventModel[];

    constructor(data: ITimelineListInitializeData) {
        this.initialize(data);
    }

    public sortByDate() {
        this.VisibleItems = this.getAssortedByDate(this.VisibleItems);
    }

    public sortByType() {
        this.VisibleItems = this.getAssortedByType(this.VisibleItems);
    }

    private initialize(data: ITimelineListInitializeData) {
        this._items = data.items;
        this.VisibleItems = data.items;
        this.SortingMode = data.sortingMode
        if (data.sortingMode === 'byDate')
            this.sortByDate();
        if (data.sortingMode === 'byType')
            this.sortByType();
    }

    private getAssortedByType(items: TimelineEventModel[]): TimelineEventModel[] {
        return Helpers.groupBy<TimelineEventModel, TimelineDocTypes>(items, i => i.DocType)
            .map(group => this.getAssortedByDate(group.Values)).reduce((acc, item) => acc.concat(item));
    }

    private getAssortedByDate(items: TimelineEventModel[]): TimelineEventModel[] {
        return items.sort((a, b) => a.Date > b.Date ? -1 : 1);
    }

}

export interface ITimelineListInitializeData {

    items?: TimelineEventModel[],
    sortingMode?: 'byDate' | 'byType';

}