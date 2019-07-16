import { interval, Observable, of } from "rxjs";
import { first, takeUntil, map, switchMapTo } from "rxjs/operators";

import { App } from "../../index/index";
import { Page } from "../page.base";
import { TimelineDocTypes } from "../../data/base/timeline-doc-types.enum";
import { TimelineEventModel } from "../../data/base/timeline-event.model";
import { NewsItemModel } from "../../data/models/news-item.model";
import { ComponentStateType, Component } from "../../components/component.base";
import { ListItemInfoTransactionComponent } from "../../components/list-item-info/transaction/list-item-info-transaction.component";
import { ListItemInfoNewsComponent } from "../../components/list-item-info/news/list-item-info-news.component";

// templates and styles
import { getListItemInfoPageTemplate } from "./list-item-info.page.template";
import './styles/list-item-info.master.scss'

export class ListItemInfoPage extends Page {

    private _model: TimelineEventModel;
    private _itemId: string;
    private _docType: TimelineDocTypes;

    constructor(state: ComponentStateType) {
        super(state);
    }

    protected getTemplate: (state: any) => string = getListItemInfoPageTemplate;

    public initialize(): Observable<void> {
        const params = App.RouterService.getParams();
        this._itemId = params.get('id');
        this._docType = params.get('docType') as TimelineDocTypes;
        if (!this._itemId || !this._docType) {
            App.RouterService.navigate('main/list');
            return of(null);
        }
        return this.loadInfo().pipe(switchMapTo(super.initialize()));
    }

    public initializeComponents() {
        super.initializeComponents();
        this.createInfoComponent().renderTemplate();
        this.checkTemplateEvents();
    }

    /** 
     * Фабрика
     * @pure
     */
    private createInfoComponent(): Component {
        if (this._model.DocType === TimelineDocTypes.Transaction)
            return new ListItemInfoTransactionComponent({ bemBlock: 'item-info', templateState: this._model });
        if (this._model.DocType === TimelineDocTypes.News)
            return new ListItemInfoNewsComponent({ bemBlock: 'item-info', templateState: this._model });
    }

    private checkTemplateEvents() {
        this.getElement('item-info__btn_back').addEventListener('click', () =>
            App.RouterService.navigate('main/list')
        );
        const deleteItemBtnElem = this.getElement('item-info__btn_delete');
        const acceptItemBtnElem = this.getElement('item-info__btn_accept');
        if (deleteItemBtnElem)
            deleteItemBtnElem.addEventListener('click', () => {
                App.TimelineEventsService.deleteItem(this._docType, this._itemId)
                    .pipe(takeUntil(this.subsKiller.Unsubscriber))
                    .subscribe(() => {
                        interval(500).pipe(first())
                            .subscribe(() => App.RouterService.navigate('main/list'))
                    });
            })
        if (acceptItemBtnElem)
            acceptItemBtnElem.addEventListener('click', () => {
                if (this._model instanceof NewsItemModel)
                    this._model.IsVisited = true;
                App.TimelineEventsService.updateItem(this._docType, this._model.toData())
                    .pipe(takeUntil(this.subsKiller.Unsubscriber))
                    .subscribe(() => {
                        this.initializeAfterRender();
                    });
            })
    }

    private loadInfo(): Observable<void> {
        return App.TimelineEventsService.getItemById(this._docType, this._itemId)
            .pipe(
                takeUntil(this.subsKiller.Unsubscriber),
                map((item: TimelineEventModel) => {
                    if (!item) {
                        App.RouterService.navigate('main/list');
                        return;
                    }
                    this._model = item;
                })
            );
    }

}