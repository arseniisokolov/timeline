import { Subject, fromEvent } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { Component } from "../../../../core-library/core/vanilla-components/component.base";
import { getListItemInfoTransactionTemplate } from "./list-item-info-transaction.component.template";
import { getListItemInfoNewsTemplate } from "./list-item-info-news.component.template";
import { Helpers } from "../../../../core-library/core/helpers";
import { TimelineEntryModel } from "../../../data/base/timeline-entry.model";
import { TimelineEntryTypes } from "../../../data/base/timeline-entry-types.enum";
import { NewsEntryModel } from "../../../data/models/news-entry.model";
import { TransactionEntryModel } from "../../../data/models/transaction-entry.model";

export class ListItemInfoEntryComponent extends Component {

    protected getTemplate: (state: any) => string = this.fabricTemplate;

    protected onInit() {
        this.setEvents({
            onBack: new Subject<void>(),
            onDelete: new Subject<void>(),
            onAccept: new Subject<void>(),
        });
    }

    private fabricTemplate(state: TimelineEntryModel) {
        switch (state.DocType) {
            case TimelineEntryTypes.Transaction: return getListItemInfoTransactionTemplate(state as TransactionEntryModel);
            case TimelineEntryTypes.News: return getListItemInfoNewsTemplate(state as NewsEntryModel);
        }
    }


    protected onRendered() {
        const acceptBtn = this.getElement('item-info__btn_accept');
        const deleteBtn = this.getElement('item-info__btn_delete');
        fromEvent(this.getElement('item-info__btn_back'), 'click')
            .pipe(takeUntil(this.subsKiller.Unsubscriber))
            .subscribe(e => {
                Helpers.stopPropagation(e);
                this.Events.onBack.next();
                this.Events.onBack.complete();
            });
        if (deleteBtn)
            fromEvent(deleteBtn, 'click')
                .pipe(takeUntil(this.subsKiller.Unsubscriber))
                .subscribe(e => {
                    this.Events.onDelete.next();
                    this.Events.onDelete.complete();
                });
        if (acceptBtn)
            fromEvent(acceptBtn, 'click')
                .pipe(takeUntil(this.subsKiller.Unsubscriber))
                .subscribe(e => {
                    Helpers.stopPropagation(e);
                    (this.state.templateState as TimelineEntryModel).markAsVisited();
                    this.Events.onAccept.next();
                    this.Events.onAccept.complete();
                });
    }

}

