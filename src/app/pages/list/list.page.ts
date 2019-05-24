import { interval, Observable } from "rxjs";
import { App } from "../../..";
import { Page } from "../page.base";
import { stopPropagation } from "../../data/base/helpers";
import { TimelineListViewModel } from "../../data/view-models/timeline-list.view-model";
import { TransactionModel } from "../../data/models/transaction.model";
import { TimelineEventModel } from "../../data/base/timeline-event.model";
import { NewsItemModel } from "../../data/models/news-item.model";

//templates and styles
import { listPageHtml } from "./list.page.html";
import './styles/list.master.scss';
import { takeUntil, first } from "rxjs/operators";

export class ListPage extends Page {

    protected pageBlockName: string = 'list';
    private _viewModel: TimelineListViewModel;
    private _isFilterElemVisible: boolean;

    constructor() {
        super();
    }

    public getTemplate(): string {
        return listPageHtml;
    }

    public initializeAfterRender() {
        if (!this._viewModel.IsInitialized)
            return;
        super.initializeAfterRender();
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
        this.renderFilter();
        this.renderItems(this._viewModel.VisibleItems);
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

    public initialize(): Observable<void> {
        return new Observable<void>(subscriber => {
            this._viewModel = new TimelineListViewModel();
            App.TimelineEventsService.getItems(App.Config.listDocTypes).pipe(takeUntil(this._unsubscriber))
                .subscribe(items => {
                    this._viewModel.initialize({ items, sortingMode: 'byDate' });
                    subscriber.next();
                });
        })
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

    private getItemTemplate(item: TimelineEventModel) {
        const node: Element = document.createElement('div');
        if (item instanceof TransactionModel) {
            node.innerHTML = `
                <div class="list-item list-item_${item.Id}">
                    <div class="list-item__main-info">
                        <div class="list-item__amount ${
                            item.Amount.Numeric > 0 ? 'list-item__amount_is-positive' : 'list-item__amount_is-negative'
                            }">${item.Amount.Formatted}
                        </div>
                        <div class="list-item__title">${item.Title}</div>
                    </div>
                    <div class="list-item__date">${item.getFormattedDate()}</div>
                </div>
            `;
        }
        if (item instanceof NewsItemModel) {
            node.innerHTML = `
                <div class="list-item list-item_${item.Id}">
                    <div class="list-item__title list-item__title_is-new ${
                        item.IsVisited ? 'list-item__title_is-visited' : ''
                        }">${item.Title}</div>
                </div>
            `;
        }
        return node;
    }

}
