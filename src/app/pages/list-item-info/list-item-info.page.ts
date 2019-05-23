import { App } from "../../..";
import { Page } from "../page.base";
import { TimelineDocTypes } from "../../data/base/timeline-doc-types.enum";
import { TimelineEventModel } from "../../data/base/timeline-event.model";
import { NewsItemModel } from "../../data/models/news-item.model";

//templates and styles
import { listItemInfoTransactionPageHtml } from "./list-item-info-transaction.page.html";
import { listItemInfoNewsPageHtml } from "./list-item-info-news.page.html";
import './styles/list-item-info.master.scss'

export class ListItemInfoPage extends Page {

    protected pageBlockName: string = 'item-info';

    private _model: TimelineEventModel;
    private _itemId: string;
    private _docType: TimelineDocTypes;

    constructor() {
        super();
        this.initialize();
    }

    public getTemplate(): string {
        switch (this._docType) {
            case TimelineDocTypes.Transaction: return listItemInfoTransactionPageHtml;
            case TimelineDocTypes.News: return listItemInfoNewsPageHtml;
        }
    }

    public initializeAfterRender() {
        super.initializeAfterRender();
        if (!this._itemId || !this._docType) {
            App.RouterService.navigate('list');
            return;
        }
        App.TimelineEventsService.getItemById(this._docType, this._itemId)
            .subscribe((item: TimelineEventModel) => {
                if (!item) {
                    App.RouterService.navigate('list');
                    return;
                }
                this._model = item;
                this.renderData();
                this.checkTemplateEvents();
            });
    }

    private renderData() {
        this.getElement('item-info__title').innerHTML = this._model.Title;
        this.getElement('item-info__description').innerHTML = this._model.Description;
        const acceptItemBtnElem = this.getElement('item-info__accept-btn');
        if (acceptItemBtnElem && this._model instanceof NewsItemModel && this._model.IsVisited)
            acceptItemBtnElem.classList.add('item-info__accept-btn_is-disabled');
    }

    private checkTemplateEvents() {
        this.getElement('item-info__back-btn').addEventListener('click', () =>
            App.RouterService.navigate('list')
        );
        const deleteItemBtnElem = this.getElement('item-info__delete-btn');
        const acceptItemBtnElem = this.getElement('item-info__accept-btn');
        if (deleteItemBtnElem)
            this.getElement('item-info__delete-btn').addEventListener('click', () => {
                App.TimelineEventsService.deleteItem(this._docType, this._model.Id).subscribe(() => {
                    App.RouterService.navigate('list');
                });
            })
        if (acceptItemBtnElem)
            this.getElement('item-info__accept-btn').addEventListener('click', () => {
                if (this._model instanceof NewsItemModel)
                    this._model.IsVisited = true;
                App.TimelineEventsService.updateItem(this._docType, this._model.toData()).subscribe(() => {
                    this.initializeAfterRender();
                });
            })
    }

    protected initialize() {
        super.initialize();
        const params = App.RouterService.getRouteParams();
        this._itemId = params.get('id');
        this._docType = params.get('docType') as TimelineDocTypes;
    }

}