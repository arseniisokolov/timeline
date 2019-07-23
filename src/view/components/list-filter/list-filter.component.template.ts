import { ListSortingModes } from "../../../business-logic/timeline-list.view-model";

export function getListFilterTemplate(state: { sortingMode: ListSortingModes }) {
    const byDateActiveClass = state.sortingMode === ListSortingModes.byDate ? 'filter-bar__item_is-active' : '';
    const byTypeActiveClass = state.sortingMode === ListSortingModes.byType ? 'filter-bar__item_is-active' : '';
    return `
        <div class="filter-bar__item filter-bar__item_by-date ${byDateActiveClass}">
            По дате
        </div>
        <div class="filter-bar__item filter-bar__item_by-type ${byTypeActiveClass}">
            По типу
        </div>
    `;
}