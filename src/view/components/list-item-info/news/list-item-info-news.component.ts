import { Subject, fromEvent } from "rxjs";
import { Component } from "../../../../../core-library/core/vanilla-components/component.base";
import { getListItemInfoNewsTemplate } from "./list-item-info-news.component.template";
import { IListItemInfoAccessable } from "../list-item-info-accessable";
import { NewsEntryModel } from "../../../../data/models/news-entry.model";
import { takeUntil } from "rxjs/operators";
import { Helpers } from "../../../../../core-library/core/helpers";

export class ListItemInfoNewsComponent extends Component implements IListItemInfoAccessable {

    public Events: {
        onBack: Subject<void>,
        onAccept: Subject<void>,
    };

    protected getTemplate: (state: any) => string = getListItemInfoNewsTemplate;

    protected onInit() {
        this.setEvents({
            onBack: new Subject<void>(),
            onAccept: new Subject<void>(),
        })
    }

    protected onRendered() {
        fromEvent(this.getElement('item-info__btn_back'), 'click')
            .pipe(takeUntil(this.subsKiller.Unsubscriber))
            .subscribe(e => {
                Helpers.stopPropagation(e);
                this.Events.onBack.next();
                this.Events.onBack.complete();
            });
        fromEvent(this.getElement('item-info__btn_accept'), 'click')
            .pipe(takeUntil(this.subsKiller.Unsubscriber))
            .subscribe(e => {
                Helpers.stopPropagation(e);
                (this.state.templateState as NewsEntryModel).IsVisited = true;
                this.Events.onAccept.next();
                this.Events.onAccept.complete();
            });
    }

}

