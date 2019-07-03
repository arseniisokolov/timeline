import { TemplateStateType } from "../../components/component.base";

export function getListPageTemplate(state: TemplateStateType): string {
    return `
        <div class="list">
            <div class="list__filter-bar filter-bar">
                <div
                    class="filter-bar__item filter-bar__item_by-date">
                    По дате
                </div>
                <div
                    class="filter-bar__item filter-bar__item_by-type">
                    По типу
                </div>
            </div>
            <div class="list__body-wrapper">
                <div class="list__body">
                    <div class="list__loader"> Новостей пока нет. Скоро появятся!</div>
                </div>
            </div>
        </div>
    `;
}