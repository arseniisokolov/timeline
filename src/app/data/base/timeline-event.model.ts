import { TimelineDocTypes } from "./timeline-doc-types.enum";
import {  getFormattedTime, getFormattedDate } from "./helpers";

/** Запись о событии в ленте новостей */
export abstract class TimelineEventModel {

    public abstract DocType: TimelineDocTypes;
    public Id: string;
    public Date: Date;
    public Title: string;
    public Description: string;

    private _snapshot: ITimelineEvent;

    public fromData(data: ITimelineEvent) {
        this._snapshot = data;
        this.Id = data.id;
        this.Description = data.description;
        if (data.docDate)
            this.Date = new Date(data.docDate);
    }

    public toData(): ITimelineEvent {
        let res: ITimelineEvent = this._snapshot;
        return res;
    }

    public getFormattedDate(): string {
        const dateAlias = this.Date.toDateString() === new Date().toDateString() ? 'сегодня' :  getFormattedDate(this.Date);
        return `${ getFormattedTime(this.Date)}, ${dateAlias}`;
    }

}


/** Запись о событии в ленте новостей */
export interface ITimelineEvent {

    id: string;
    docDate: number;
    description: string;

}