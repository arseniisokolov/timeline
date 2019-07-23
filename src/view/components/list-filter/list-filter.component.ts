import { fromEvent, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { Component } from "../../../../core-library/core/vanilla-components/component.base";
import { getListFilterTemplate } from "./list-filter.component.template";
import { ListSortingModes } from "../../../business-logic/timeline-list.view-model";

export class ListFilterComponent extends Component {

    public Events: {
        onFiltering: Subject<ListSortingModes>,
    };

    protected onInit() {
        this.setEvents({
            onFiltering: new Subject<ListSortingModes>()
        });
    }

    protected getTemplate: (state: any) => string = getListFilterTemplate;

    protected onRendered() {
        const dateBtnElem = this.getElement('filter-bar__item_by-date');
        const typeBtnElem = this.getElement('filter-bar__item_by-type');
        fromEvent(dateBtnElem, 'click')
            .pipe(takeUntil(this.subsKiller.Unsubscriber))
            .subscribe(() => {
                dateBtnElem.classList.add('filter-bar__item_is-active');
                typeBtnElem.classList.remove('filter-bar__item_is-active');
                this.Events.onFiltering.next(ListSortingModes.byDate);
            });
        fromEvent(typeBtnElem, 'click')
            .pipe(takeUntil(this.subsKiller.Unsubscriber))
            .subscribe(() => {
                typeBtnElem.classList.add('filter-bar__item_is-active');
                dateBtnElem.classList.remove('filter-bar__item_is-active');
                this.Events.onFiltering.next(ListSortingModes.byType);
            });
    }

}