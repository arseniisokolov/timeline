import { TimelineEventModel, ITimelineEvent } from "../base/timeline-event.model";
import { TimelineDocTypes } from "../base/timeline-doc-types.enum";

/** Новость о событии */
export class NewsItemModel extends TimelineEventModel {

    public static handleResponse(data: INewsItem[]): NewsItemModel[] {
        if (!Array.isArray(data))
            return [];
        return data.map(i => {
            const model = new NewsItemModel();
            model.fromData(i);
            return model;
        });
    }

    public DocType: TimelineDocTypes = TimelineDocTypes.News;
    /** Новость была прочитана */
    public IsVisited: boolean;

    public fromData(data: INewsItem) {
        if (!data)
            return;
        super.fromData(data);
        this.Title = data.extract;
        this.IsVisited = data.isVisited;
    }

    public toData(): INewsItem {
        const res: INewsItem = super.toData() as INewsItem;
        res.isVisited = this.IsVisited;
        return res;
    }

}

/** Новость о событии */
export interface INewsItem extends ITimelineEvent {

    extract: string;
    isVisited: boolean;

}