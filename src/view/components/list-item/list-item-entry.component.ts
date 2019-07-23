import { Subject, fromEvent } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { Component } from "../../../../core-library/core/vanilla-components/component.base";
import { getListItemTransactionTemplate } from "./list-item-transaction.component.template";
import { getListItemNewsTemplate } from "./list-item-news.component.template";
import { TimelineEntryModel } from "../../../data/base/timeline-entry.model";
import { TimelineEntryTypes } from "../../../data/base/timeline-entry-types.enum";
import { Helpers } from "../../../../core-library/core/helpers";

export class ListItemEntryComponent extends Component {

    protected getTemplate: (state: any) => string = this.fabricTemplate;

    protected onInit() {
        this.setEvents({
            onSelect: new Subject<void>(),
        })
    }

    protected onRendered() {
        fromEvent(this.bemBlockElem, 'click')
            .pipe(takeUntil(this.subsKiller.Unsubscriber))
            .subscribe(e => {
                Helpers.stopPropagation(e);
                this.Events.onSelect.next();
            });
    }

    private fabricTemplate(state: any) {
        switch ((state.Item as TimelineEntryModel).DocType) {
            case TimelineEntryTypes.Transaction: return getListItemTransactionTemplate(state);
            case TimelineEntryTypes.News: return getListItemNewsTemplate(state);
        }
    }


}

