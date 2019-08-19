import { TimelineEntryTypes } from "./timeline-entry-types.enum";
import { ITimelineShowable, TimelineEntryModel } from "./timeline-entry.model";
import { NewsEntryModel, INewsItem } from "../models/news-entry.model";
import { TransactionEntryModel, ITransaction } from "../models/transaction-entry.model";

export class TimelineEventStrategy {

    public static create(docType: TimelineEntryTypes, response: ITimelineShowable[]): TimelineEntryModel[] {
        switch (docType) {
            case TimelineEntryTypes.Transaction: return TransactionEntryModel.handleResponse(response as ITransaction[]);
            case TimelineEntryTypes.News: return NewsEntryModel.handleResponse(response as INewsItem[]);
            default: return [];
        }
    }

}