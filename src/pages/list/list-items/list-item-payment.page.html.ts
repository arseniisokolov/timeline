import { TransactionModel } from "../../../data/models/transaction.model";

export function getListItemTransactionHtml(item: TransactionModel) {
    const amountStateClass = item.Amount.Numeric > 0 ? 'list-item__amount_is-positive' : '';
    return `
        <div class="list-item list-item_${item.Id}">
            <div class="list-item__main-info">
                <div class="list-item__amount ${amountStateClass}">${item.Amount.Formatted}</div>
                <div class="list-item__title"> ${ item.Title} </div>
            </div>
            <div class="list-item__date">${item.getFormattedDate()}</div>
        </div>
    `;
};