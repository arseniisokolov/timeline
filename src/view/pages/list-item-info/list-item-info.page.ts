import { interval, Observable, of } from "rxjs";
import { first, takeUntil, map, switchMapTo } from "rxjs/operators";

import { App } from "../../index";
import { TimelineEntryTypes } from "../../../data/base/timeline-entry-types.enum";
import { TimelineEntryModel } from "../../../data/base/timeline-entry.model";
import { Page } from "../../../../core-library/core/vanilla-components/page.base";
import { ComponentStateType } from "../../../../core-library/core/vanilla-components/component.base";
import { ListItemInfoEntryComponent } from "../../components/list-item-info/list-item-info-entry.component";

// templates and styles
import { getListItemInfoPageTemplate } from "./list-item-info.page.template";
import './styles/list-item-info.master.scss'

export class ListItemInfoPage extends Page {

    private _model: TimelineEntryModel;
    private _itemId: string;
    private _docType: TimelineEntryTypes;
    private _infoComponent: ListItemInfoEntryComponent;

    constructor(state: ComponentStateType) {
        super(state);
    }

    protected getTemplate: (state: any) => string = getListItemInfoPageTemplate;

    public initialize(): Observable<void> {
        const params = App.RouterService.getParams();
        this._itemId = params.get('id');
        this._docType = params.get('docType') as TimelineEntryTypes;
        if (!this._itemId || !this._docType) {
            App.RouterService.navigate('main/list');
            return of(null);
        }
        return this.loadItem().pipe(switchMapTo(super.initialize()));
    }

    public initializeComponents() {
        super.initializeComponents();
        this._infoComponent = new ListItemInfoEntryComponent({ bemBlock: 'item-info', templateState: this._model });
        this._infoComponent.renderTemplate();
        this.checkTemplateEvents();
    }

    private checkTemplateEvents() {
        this._infoComponent.Events.onBack
            .pipe(takeUntil(this.subsKiller.Unsubscriber))
            .subscribe(() => {
                App.RouterService.navigate('main/list');
            });
        if (this._infoComponent.Events.onDelete)
            this._infoComponent.Events.onDelete
                .pipe(takeUntil(this.subsKiller.Unsubscriber))
                .subscribe(() => {
                    this.deleteItem();
                });
        if (this._infoComponent.Events.onAccept)
            this._infoComponent.Events.onAccept
                .pipe(takeUntil(this.subsKiller.Unsubscriber))
                .subscribe(() => {
                    this.acceptItem();
                });
    }

    private loadItem(): Observable<void> {
        return App.TimelineEntriesService.getItemById(this._docType, this._itemId)
            .pipe(
                takeUntil(this.subsKiller.Unsubscriber),
                map((item: TimelineEntryModel) => {
                    if (!item) {
                        App.RouterService.navigate('main/list');
                        return;
                    }
                    this._model = item;
                })
            );
    }

    private deleteItem() {
        App.TimelineEntriesService.deleteItem(this._docType, this._itemId)
            .pipe(takeUntil(this.subsKiller.Unsubscriber))
            .subscribe(() => {
                interval(500).pipe(first())
                    .subscribe(() => App.RouterService.navigate('main/list'))
            })
    }

    private acceptItem() {
        App.TimelineEntriesService.updateItem(this._docType, this._model.toData())
            .pipe(takeUntil(this.subsKiller.Unsubscriber))
            .subscribe(() => {
                this.initializeAfterRender();
            })
    }


}