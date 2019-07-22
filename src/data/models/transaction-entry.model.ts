import { TimelineEntryModel, ITimelineShowable } from "../base/timeline-entry.model";
import { TimelineEntryTypes } from "../base/timeline-entry-types.enum";
import { AmountModel } from "../../../core-library/core/models/amount.model";

/** Финансовая транзакция */
export class TransactionEntryModel extends TimelineEntryModel {

    public static handleResponse(data: ITransaction[]): TransactionEntryModel[] {
        if (!Array.isArray(data))
            return [];
        return data.map(i => {
            const model = new TransactionEntryModel();
            model.fromData(i);
            return model;
        });
    }

    public DocType: TimelineEntryTypes = TimelineEntryTypes.Transaction;
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
export interface ITransaction extends ITimelineShowable {

    amount: number;
    currency: string;
    /** Направление операции: true - расходная (дебет), false - приходная (кредит) */
    isDebet: boolean;
    senderName: string;

}