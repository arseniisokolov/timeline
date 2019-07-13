import { TimelineDocTypes } from "./timeline-doc-types.enum";
import { ITimelineEvent, TimelineEventModel } from "./timeline-event.model";
import { NewsItemModel, INewsItem } from "../models/news-item.model";
import { TransactionModel, ITransaction } from "../models/transaction.model";

export class TimelineEventFabric {

    public static create(docType: TimelineDocTypes, response: ITimelineEvent[]): TimelineEventModel[] {
        switch (docType) {
            case TimelineDocTypes.Transaction: return TransactionModel.handleResponse(response as ITransaction[]);
            case TimelineDocTypes.News: return NewsItemModel.handleResponse(response as INewsItem[]);
            default: return [];
        }
    }

}