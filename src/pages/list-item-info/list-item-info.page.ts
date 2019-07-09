import { interval, Observable } from "rxjs";
import { first, takeUntil } from "rxjs/operators";

import { App } from "../../index/index";
import { Page } from "../page.base";
import { TimelineDocTypes } from "../../data/base/timeline-doc-types.enum";
import { TimelineEventModel } from "../../data/base/timeline-event.model";
import { NewsItemModel } from "../../data/models/news-item.model";
import { TemplateStateType, ComponentStateType } from "../../components/component.base";

//templates and styles
import { getListItemInfoTransactionPageTemplate } from "./list-item-info-transaction.page.html";
import { getListItemInfoNewsPageTemplate } from "./list-item-info-news.page.html";
import './styles/list-item-info.master.scss'

export class ListItemInfoPage extends Page {

    private _model: TimelineEventModel;
    private _itemId: string;
    private _docType: TimelineDocTypes;

    constructor(state: ComponentStateType) {
        super(state);
    }

    protected getTemplate: (state: TemplateStateType) => string = getListItemInfoTransactionPageTemplate;

    /** TO DO: вместо этого switch создать два компонента */
    // {
    //     switch (this._docType) {
    //         case TimelineDocTypes.Transaction: return getListItemInfoTransactionPageTemplate;
    //         case TimelineDocTypes.News: return getListItemInfoNewsPageTemplate;
    //     }
    // };

    public initializeAfterRender() {
        super.initializeAfterRender();
        if (!this._itemId || !this._docType) {
            App.RouterService.navigate('main/list');
            return;
        }
        App.TimelineEventsService.getItemById(this._docType, this._itemId)
            .pipe(takeUntil(this.subsKiller.Unsubscriber))
            .subscribe((item: TimelineEventModel) => {
                if (!item) {
                    App.RouterService.navigate('main/list');
                    return;
                }
                this._model = item;
                this.renderData();
                this.checkTemplateEvents();
            });
    }

    public initialize(): Observable<void> {
        const params = App.RouterService.getRouteParams();
        this._itemId = params.get('id');
        this._docType = params.get('docType') as TimelineDocTypes;
        return super.initialize();
    }

    private renderData() {
        this.getElement('item-info__title').innerHTML = this._model.Title;
        this.getElement('item-info__body').innerHTML = this._model.Description;
        const acceptItemBtnElem = this.getElement('item-info__btn_accept');
        if (acceptItemBtnElem && this._model instanceof NewsItemModel && this._model.IsVisited)
            acceptItemBtnElem.classList.add('item-info__btn_is-disabled');
    }

    private checkTemplateEvents() {
        this.getElement('item-info__btn_back').addEventListener('click', () =>
            App.RouterService.navigate('main/list')
        );
        const deleteItemBtnElem = this.getElement('item-info__btn_delete');
        const acceptItemBtnElem = this.getElement('item-info__btn_accept');
        if (deleteItemBtnElem)
            deleteItemBtnElem.addEventListener('click', () => {
                App.TimelineEventsService.deleteItem(this._docType, this._model.Id)
                    .pipe(takeUntil(this.subsKiller.Unsubscriber))
                    .subscribe(() => {
                        interval(500).pipe(first(), takeUntil(this.subsKiller.Unsubscriber))
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

}