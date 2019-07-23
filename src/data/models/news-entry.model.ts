import { TimelineEntryModel, ITimelineShowable } from "../base/timeline-entry.model";
import { TimelineEntryTypes } from "../base/timeline-entry-types.enum";

/** Новость о событии */
export class NewsEntryModel extends TimelineEntryModel {

    public static handleResponse(data: INewsItem[]): NewsEntryModel[] {
        if (!Array.isArray(data))
            return [];
        return data.map(i => {
            const model = new NewsEntryModel();
            model.fromData(i);
            return model;
        });
    }

    public DocType: TimelineEntryTypes = TimelineEntryTypes.News;

    /** Новость была прочитана */
    public get IsVisited(): boolean {
        return this._isVisited;
    }
    public _isVisited: boolean;

    public fromData(data: INewsItem) {
        if (!data)
            return;
        super.fromData(data);
        this.Title = data.extract;
        this._isVisited = data.isVisited;
    }

    public toData(): INewsItem {
        const res: INewsItem = super.toData() as INewsItem;
        res.isVisited = this.IsVisited;
        return res;
    }

    public markAsVisited() {
        this._isVisited = true;
    }

}

/** Новость о событии */
export interface INewsItem extends ITimelineShowable {

    extract: string;
    isVisited: boolean;

}