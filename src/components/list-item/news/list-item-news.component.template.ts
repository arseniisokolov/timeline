export function getListItemNewsTemplate(state: any) {
    const titleStateClass = state.Item.IsVisited ? 'list-item__title_is-visited' : '';
    return `
        <div class="list-item">
            <div class="list-item__title list-item__title_is-new ${titleStateClass}">${state.Item.Title}</div>
        </div>
    `;
};