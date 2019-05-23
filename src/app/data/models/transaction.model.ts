import { AmountModel } from "../base/amount.model";
import { TimelineEventModel, ITimelineEvent } from "../base/timeline-event.model";

/** Финансовая транзакция */
export class TransactionModel extends TimelineEventModel {

    public static handleResponse(data: ITransaction[]): TransactionModel[] {
        if (!Array.isArray(data))
            return [];
        return data.map(i => {
            const model = new TransactionModel();
            model.fromData(i);
            return model;
        });
    }

    public Amount: AmountModel;

    public fromData(data: ITransaction) {
        if (!data)
            return;
        super.fromData(data);
        this.Amount = new AmountModel(data.amount, data.currency, data.isDebet);
        this.Title = data.senderName;
    }

}

/** Финансовая транзакция */
export interface ITransaction extends ITimelineEvent {

    amount: number;
    currency: string;
    /** true - операция расходная (дебет), false - приходная (кредит) */
    isDebet: boolean;
    senderName: string;

}