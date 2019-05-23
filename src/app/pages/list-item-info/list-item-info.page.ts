import { Page } from "../page.base";
import { TimelineEventModel } from "../../data/base/timeline-event.model";
import { App } from "../../../app";
import { TimelineDocTypes } from "../../data/base/timeline-doctypes.enum";

import { listItemInfoTransactionPageHtml } from "./list-item-info-transaction.page.html";
import { listItemInfoNewsPageHtml } from "./list-item-info-news.page.html";
import { NewsItemModel } from "../../data/models/news-item.model";

export class ListItemInfoPage extends Page {

    protected pageBlockName: string = 'list-item-info';

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
        this.getElement('list-item-info__title').innerHTML = this._model.Title;
        this.getElement('list-item-info__description').innerHTML = this._model.Description;
        this.getElement('list-item-info__back-btn').addEventListener('click', () => {
            App.RouterService.navigate('list');
        })
    }

    private checkTemplateEvents() {
        const deleteItemBtnElem = this.getElement('list-item-info__delete-btn');
        const acceptItemBtnElem = this.getElement('list-item-info__accept-btn');
        if (deleteItemBtnElem)
            this.getElement('list-item-info__delete-btn').addEventListener('click', () => {
                App.TimelineEventsService.deleteItem(this._docType, this._model.Id).subscribe(() => {
                    App.RouterService.navigate('list');
                });
            })
        if (acceptItemBtnElem)
            this.getElement('list-item-info__accept-btn').addEventListener('click', () => {
                (this._model as NewsItemModel).IsVisited = true;
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