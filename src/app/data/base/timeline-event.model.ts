/** Запись о событии в ленте новостей */
export abstract class TimelineEventModel {

    public Id: string;
    public DocDate: Date;
    public Title: string;
    public Description: string;

    public fromData(data: ITimelineEvent) {
        this.Id = data.id;
        this.Description = data.description;
        if (data.docDate)
            this.DocDate = new Date(data.docDate);
    }

}


/** Запись о событии в ленте новостей */
export interface ITimelineEvent {

    id: string;
    docDate: number;
    description: string;

}