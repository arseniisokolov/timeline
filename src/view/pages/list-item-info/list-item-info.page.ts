import { interval, Observable, of } from "rxjs";
import { first, takeUntil, map, switchMapTo } from "rxjs/operators";

import { App } from "../../index";
import { TimelineEntryTypes } from "../../../data/base/timeline-entry-types.enum";
import { TimelineEntryModel } from "../../../data/base/timeline-entry.model";
import { NewsEntryModel } from "../../../data/models/news-entry.model";
import { ListItemInfoTransactionComponent } from "../../components/list-item-info/transaction/list-item-info-transaction.component";
import { ListItemInfoNewsComponent } from "../../components/list-item-info/news/list-item-info-news.component";
import { Page } from "../../../../core-library/core/vanilla-components/page.base";
import { ComponentStateType } from "../../../../core-library/core/vanilla-components/component.base";
import { IListItemInfoAccessable } from "../../components/list-item-info/list-item-info-accessable";

// templates and styles
import { getListItemInfoPageTemplate } from "./list-item-info.page.template";
import './styles/list-item-info.master.scss'

export class ListItemInfoPage extends Page {

    private _model: TimelineEntryModel;
    private _itemId: string;
    private _docType: TimelineEntryTypes;
    private _infoComponent: IListItemInfoAccessable;

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
        return this.loadInfo().pipe(switchMapTo(super.initialize()));
    }

    public initializeComponents() {
        super.initializeComponents();
        this._infoComponent = this.createInfoComponent();
        this._infoComponent.renderTemplate();
        this.checkTemplateEvents();
    }

    /** 
     * Фабрика
     * @pure
     */
    private createInfoComponent(): IListItemInfoAccessable {
        if (this._model.DocType === TimelineEntryTypes.Transaction)
            return new ListItemInfoTransactionComponent({ bemBlock: 'item-info', templateState: this._model });
        if (this._model.DocType === TimelineEntryTypes.News)
            return new ListItemInfoNewsComponent({ bemBlock: 'item-info', templateState: this._model });
    }

    private checkTemplateEvents() {
        this._infoComponent.EventEmitters.onBack
            .pipe(takeUntil(this.subsKiller.Unsubscriber))
            .subscribe(() => {
                App.RouterService.navigate('main/list');
            });
        const deleteItemBtnElem = this.getElement('item-info__btn_delete');
        const acceptItemBtnElem = this.getElement('item-info__btn_accept');
        if (deleteItemBtnElem)
            deleteItemBtnElem.addEventListener('click', () => {
                App.TimelineEntriesService.deleteItem(this._docType, this._itemId)
                    .pipe(takeUntil(this.subsKiller.Unsubscriber))
                    .subscribe(() => {
                        interval(500).pipe(first())
                            .subscribe(() => App.RouterService.navigate('main/list'))
                    });
            })
        if (acceptItemBtnElem)
            acceptItemBtnElem.addEventListener('click', () => {
                if (this._model instanceof NewsEntryModel)
                    this._model.IsVisited = true;
                App.TimelineEntriesService.updateItem(this._docType, this._model.toData())
                    .pipe(takeUntil(this.subsKiller.Unsubscriber))
                    .subscribe(() => {
                        this.initializeAfterRender();
                    });
            })
    }

    private loadInfo(): Observable<void> {
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

}