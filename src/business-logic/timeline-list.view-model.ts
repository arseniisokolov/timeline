import { TimelineEntryModel } from "../data/base/timeline-entry.model";
import { TimelineEntryTypes } from "../data/base/timeline-entry-types.enum";
import { Helpers } from "../../core-library/core/classes/helpers";

export enum ListSortingModes {
    byDate = 0,
    byType = 1,
}

export class TimelineListViewModel {

    public VisibleItems: TimelineEntryModel[];
    public IsInitialized: boolean;
    /** Способ сортировки */
    public SortingMode: ListSortingModes;

    private _items: TimelineEntryModel[] = [];

    public initialize(data: ITimelineListInitializeData) {
        this._items = data.items;
        this.VisibleItems = this._items || [];
        this.sortBy(data.sortingMode);
        this.IsInitialized = true;
    }

    /** Добавляет новые записи к текущему списку и
     *  выдает их отсортированными
     */
    public appendItems(items: TimelineEntryModel[]): TimelineEntryModel[] {
        this._items = [...this._items, ...items];
        this.VisibleItems = this._items;
        this.sortBy(this.SortingMode);
        return this.VisibleItems.filter(item => items.some(i => item.Id === i.Id));
    }

    /** Сортировать записи по ключу */
    public sortBy(mode: ListSortingModes) {
        this.SortingMode = mode;
        switch (mode) {
            case ListSortingModes.byDate:
                this.VisibleItems = this.getAssortedByDate(this.VisibleItems);
                break;
            case ListSortingModes.byType:
                this.VisibleItems = this.getAssortedByType(this.VisibleItems);
                break;
        }
    }

    private getAssortedByType(items: TimelineEntryModel[]): TimelineEntryModel[] {
        return Helpers.groupBy<TimelineEntryModel, TimelineEntryTypes>(items, i => i.DocType)
            .map(group => this.getAssortedByDate(group.Values)).reduce((acc, item) => acc.concat(item));
    }

    private getAssortedByDate(items: TimelineEntryModel[]): TimelineEntryModel[] {
        return items.sort((a, b) => a.Date > b.Date ? 1 : -1);
    }

}

export interface ITimelineListInitializeData {

    items?: TimelineEntryModel[],
    /** Способ сортировки */
    sortingMode?: ListSortingModes;

}