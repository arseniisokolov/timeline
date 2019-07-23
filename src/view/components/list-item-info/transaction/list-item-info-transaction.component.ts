import { Subject, fromEvent } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { Component } from "../../../../../core-library/core/vanilla-components/component.base";
import { getListItemInfoTransactionTemplate } from "./list-item-info-transaction.component.template";
import { IListItemInfoAccessable } from "../list-item-info-accessable";
import { Helpers } from "../../../../../core-library/core/helpers";

export class ListItemInfoTransactionComponent extends Component implements IListItemInfoAccessable {

    public Events: {
        onBack: Subject<void>,
        onDelete: Subject<void>,
    };

    protected getTemplate: (state: any) => string = getListItemInfoTransactionTemplate;

    protected onInit() {
        this.setEvents({
            onBack: new Subject<void>(),
            onDelete: new Subject<void>(),
        });
    }

    protected onRendered() {
        fromEvent(this.getElement('item-info__btn_back'), 'click')
            .pipe(takeUntil(this.subsKiller.Unsubscriber))
            .subscribe(e => {
                Helpers.stopPropagation(e);
                this.Events.onBack.next();
                this.Events.onBack.complete();
            });
        fromEvent(this.getElement('item-info__btn_delete'), 'click')
            .pipe(takeUntil(this.subsKiller.Unsubscriber))
            .subscribe(e => {
                this.Events.onDelete.next();
                this.Events.onDelete.complete();
            });
    }

}

