import { interval, Observable } from "rxjs";
import { takeUntil, first, map } from "rxjs/operators";

import { App } from "../../index/index";
import { Page } from "../page.base";
import { stopPropagation } from "../../data/base/helpers";
import { TimelineListViewModel } from "../../data/view-models/timeline-list.view-model";
import { TransactionModel } from "../../data/models/transaction.model";
import { TimelineEventModel } from "../../data/base/timeline-event.model";
import { NewsItemModel } from "../../data/models/news-item.model";

//templates and styles
import { getListPageHtml } from "./list.page.html";
import { getListItemTransactionHtml } from "./list-items/list-item-payment.page.html";
import { getListItemNewsHtml } from "./list-items/list-item-news.html";
import './styles/list.master.scss';

export class ListPage extends Page {

    protected pageBlockName: string = 'list';
    private _viewModel: TimelineListViewModel;
    private _isFilterElemVisible: boolean;

    constructor() {
        super();
    }

    public getTemplate(): string {
        return getListPageHtml();
    }

    public initializeAfterRender() {
        if (!this._viewModel.IsInitialized)
            return;
        super.initializeAfterRender();
        this.checkTemplateEvents();
        this.renderFilter();
        this.renderItems(this._viewModel.VisibleItems);
        this.checkForNewItems();
    }

    public initialize(): Observable<void> {
        this._viewModel = new TimelineListViewModel();
        return App.TimelineEventsService.getItems(App.Config.listDocTypes).pipe(takeUntil(this._unsubscriber))
            .pipe(map(items => {
                this._viewModel.initialize({ items, sortingMode: 'byDate' });
            }));
    }

    private getItemTemplate(item: TimelineEventModel) {
        const node: Element = document.createElement('div');
        if (item instanceof TransactionModel) {
            node.innerHTML = getListItemTransactionHtml(item);
        }
        if (item instanceof NewsItemModel) {
            node.innerHTML = getListItemNewsHtml(item);
        }
        return node;
    }

    private renderItems(items: TimelineEventModel[]) {
        if (!items.length)
            return;
        const listElem = this.getElement('list__body');
        const loader = this.getElement('list__loader');
        if (loader)
            loader.remove();
        items.forEach(item => {
            const itemElem = this.getItemTemplate(item);
            listElem.insertBefore(itemElem, listElem.firstChild);
            itemElem.addEventListener('click', (e: Event) => {
                stopPropagation(e);
                App.RouterService.navigate(`info?id=${item.Id}&docType=${item.DocType}`);
            });
        });
    }

    private renderFilter() {
        if (this._isFilterElemVisible)
            return;
        if (!this._viewModel.IsInitialized || !this._viewModel.VisibleItems.length) {
            this.getElement('list__filter-bar').classList.add('list__filter-bar_is-hidden');
            this._isFilterElemVisible = false;
            return;
        }
        this.getElement('list__filter-bar').classList.remove('list__filter-bar_is-hidden');
        this._isFilterElemVisible = true;
    }

    private checkTemplateEvents() {
        const dateBtnElem = this.getElement('filter-bar__item_by-date');
        const typeBtnElem = this.getElement('filter-bar__item_by-type');
        if (this._viewModel.SortingMode === 'byDate')
            dateBtnElem.classList.add('filter-bar__item_is-active');
        if (this._viewModel.SortingMode === 'byType')
            typeBtnElem.classList.add('filter-bar__item_is-active');
        dateBtnElem.addEventListener('click', () => {
            dateBtnElem.classList.add('filter-bar__item_is-active');
            typeBtnElem.classList.remove('filter-bar__item_is-active');
            this._viewModel.sortBy('byDate');
            this.getElement('list__body').innerHTML = '';
            this.renderItems(this._viewModel.VisibleItems);
        });
        typeBtnElem.addEventListener('click', () => {
            typeBtnElem.classList.add('filter-bar__item_is-active');
            dateBtnElem.classList.remove('filter-bar__item_is-active');
            this._viewModel.sortBy('byType');
            this.getElement('list__body').innerHTML = '';
            this.renderItems(this._viewModel.VisibleItems);
        });
    }

    private checkForNewItems() {
        interval(5000).pipe(takeUntil(this._unsubscriber))
            .subscribe(() => {
                App.TimelineEventsService.getItems(App.Config.listDocTypes, true).pipe(first())
                    .subscribe(items => {
                        if (!items.length)
                            return;
                        if (this._viewModel.SortingMode === 'byDate') {
                            this.renderItems(this._viewModel.appendItems(items));
                        } else {
                            this._viewModel.appendItems(items)
                            this.getElement('list__body').innerHTML = '';
                            this.renderItems(this._viewModel.VisibleItems);
                        }
                        this.renderFilter();
                    });
            });
    }

}
