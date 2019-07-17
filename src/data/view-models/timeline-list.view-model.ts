import { TimelineEventModel } from "../base/timeline-event.model";
import { TimelineDocTypes } from "../base/timeline-doc-types.enum";
import { Helpers } from "../../../core-library/core/helpers";

export class TimelineListViewModel {

    public VisibleItems: TimelineEventModel[];
    public IsInitialized: boolean;
    /** Способ сортировки */
    public SortingMode: 'byDate' | 'byType';

    private _items: TimelineEventModel[] = [];

    public initialize(data: ITimelineListInitializeData) {
        this._items = data.items;
        this.VisibleItems = this._items || [];
        this.sortBy(data.sortingMode);
        this.IsInitialized = true;
    }

    /** Добавляет новые записи к текущему списку и
     *  выдает их отсортированными
     */
    public appendItems(items: TimelineEventModel[]): TimelineEventModel[] {
        this._items = [...this._items, ...items];
        this.VisibleItems = this._items;
        this.sortBy(this.SortingMode);
        return this.VisibleItems.filter(item => items.some(i => item.Id === i.Id));
    }

    /** Сортировать записи по ключу */
    public sortBy(mode: 'byDate' | 'byType') {
        this.SortingMode = mode;
        switch (mode) {
            case 'byDate':
                this.VisibleItems = this.getAssortedByDate(this.VisibleItems);
                break;
            case 'byType':
                this.VisibleItems = this.getAssortedByType(this.VisibleItems);
                break;
        }
    }

    private getAssortedByType(items: TimelineEventModel[]): TimelineEventModel[] {
        return Helpers.groupBy<TimelineEventModel, TimelineDocTypes>(items, i => i.DocType)
            .map(group => this.getAssortedByDate(group.Values)).reduce((acc, item) => acc.concat(item));
    }

    private getAssortedByDate(items: TimelineEventModel[]): TimelineEventModel[] {
        return items.sort((a, b) => a.Date > b.Date ? 1 : -1);
    }

}

export interface ITimelineListInitializeData {

    items?: TimelineEventModel[],
    /** Способ сортировки */
    sortingMode?: 'byDate' | 'byType';

}