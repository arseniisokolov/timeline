import { NewsItemModel } from "../../../data/models/news-item.model";

export function getListItemNewsHtml(item: NewsItemModel) {
    const titleStateClass = item.IsVisited ? 'list-item__title_is-visited' : '';
    return `
        <div class="list-item list-item_${item.Id}">
            <div class="list-item__title list-item__title_is-new ${titleStateClass}">${item.Title}</div>
        </div>
    `;
}