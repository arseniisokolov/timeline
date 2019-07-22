import { TimelineEntryTypes } from "./timeline-entry-types.enum";
import { Helpers } from "../../../core-library/core/helpers";

/** Запись о событии в ленте новостей */
export abstract class TimelineEntryModel {

    public abstract DocType: TimelineEntryTypes;
    public Id: string;
    public Date: Date;
    public Title: string;
    public Description: string;

    private _snapshot: ITimelineShowable;

    public fromData(data: ITimelineShowable) {
        this._snapshot = data;
        this.Id = data.id;
        this.Description = data.description;
        if (data.docDate)
            this.Date = new Date(data.docDate);
    }

    public toData(): ITimelineShowable {
        let res: ITimelineShowable = this._snapshot;
        return res;
    }

    public getFormattedDate(): string {
        const dateAlias = this.Date.toDateString() === new Date().toDateString() ? 'сегодня' : Helpers.getFormattedDate(this.Date);
        return `${Helpers.getFormattedTime(this.Date)}, ${dateAlias}`;
    }

}

/** Запись о событии в ленте новостей */
export interface ITimelineShowable {

    id: string;
    docDate: number;
    description: string;

}