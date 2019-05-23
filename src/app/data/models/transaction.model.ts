import { AmountModel } from "../base/amount.model";
import { TimelineEventModel, ITimelineEvent } from "../base/timeline-event.model";
import { TimelineDocTypes } from "../base/timeline-doctypes.enum";

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

    public DocType: TimelineDocTypes = TimelineDocTypes.Transaction;
    public Amount: AmountModel;

    public fromData(data: ITransaction) {
        if (!data)
            return;
        super.fromData(data);
        this.Amount = new AmountModel(data.amount, data.currency, data.isDebet);
        this.Title = data.senderName;
    }

    public toData(): ITransaction {
        const res: ITransaction = super.toData() as ITransaction;
        return res;
    }

}

/** Финансовая транзакция */
export interface ITransaction extends ITimelineEvent {

    amount: number;
    currency: string;
    /** Направление операции: true - расходная (дебет), false - приходная (кредит) */
    isDebet: boolean;
    senderName: string;

}