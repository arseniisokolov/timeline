import { NewsEntryModel } from "../../../data/models/news-entry.model";

export function getListItemInfoNewsTemplate(state: NewsEntryModel) {
    const btnCssClass = state.IsVisited ? 'item-info__btn_is-disabled' : '';
    return `
        <div class="item-info__header">
            <div class="item-info__btn item-info__btn_back"><i class="fas fa-long-arrow-alt-left"></i></div>
            <div class="item-info__btn item-info__btn_accept ${btnCssClass}"><i class="fas fa-check"></i></div>
            <div class="item-info__title">${state.Title}</div>
        </div>
        <div class="item-info__body">${state.Description}</div>
    `;
};