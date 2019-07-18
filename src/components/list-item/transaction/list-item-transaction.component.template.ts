export function getListItemTransactionTemplate(state: any) {
    const amountStateClass = state.Item.Amount.Numeric > 0 ? 'list-item__amount_is-positive' : '';
    return `
        <div class="list-item__main-info">
            <div class="list-item__amount ${amountStateClass}">${state.Item.Amount.Formatted}</div>
            <div class="list-item__title"> ${state.Item.Title} </div>
        </div>
        <div class="list-item__date">${state.Item.getFormattedDate()}</div>
    `;
};