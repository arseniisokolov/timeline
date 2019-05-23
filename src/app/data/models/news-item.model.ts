import { TimelineEventModel, ITimelineEvent } from "../base/timeline-event.model";

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

    public fromData(data: INewsItem) {
        if (!data)
            return;
        super.fromData(data);
    }

}

/** Новость о событии */
export interface INewsItem extends ITimelineEvent {

    // на будущее

}