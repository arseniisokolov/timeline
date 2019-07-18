import { TransactionModel } from "../../../../data/models/transaction.model";

export function getListItemInfoTransactionTemplate(state: TransactionModel) {
    return `
        <div class="item-info__header">
            <div class="item-info__btn item-info__btn_back"><i class="fas fa-long-arrow-alt-left"></i></div>
            <div class=" item-info__btn item-info__btn_delete"><i class="fas fa-trash"></i></div>
            <div class="item-info__title">${state.Title}</div>
        </div>
        <div class="item-info__body">${state.Description}</div>
    `;
};