import { TimelineEventModel } from "../base/timeline-event.model";

export class TimelineListViewModel {

    public Items: TimelineEventModel[];


    constructor(data: ITimelineListInitializeData) {
        this.Items = data.items;
    }

}

export interface ITimelineListInitializeData {

    items?: TimelineEventModel[],

}