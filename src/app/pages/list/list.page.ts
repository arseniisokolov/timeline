import { App } from "../../..";
import { Page } from "../page.base";
import { Helpers } from "../../data/base/helpers";
import { TimelineListViewModel } from "../../data/view-models/timeline-list.view-model";
import { TransactionModel } from "../../data/models/transaction.model";
import { TimelineEventModel } from "../../data/base/timeline-event.model";
import { NewsItemModel } from "../../data/models/news-item.model";

//templates and styles
import { listPageHtml } from "./list.page.html";
import './styles/list.master.scss';

export class ListPage extends Page {

    protected pageBlockName: string = 'list';
    private _viewModel: TimelineListViewModel;

    constructor() {
        super();
        this.initialize();
    }

    public getTemplate(): string {
        return listPageHtml;
    }

    public initializeAfterRender() {
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
            this._viewModel.sortByDate();
            this.renderItems();
        }
        );
        typeBtnElem.addEventListener('click', () => {
            typeBtnElem.classList.add('filter-bar__item_is-active');
            dateBtnElem.classList.remove('filter-bar__item_is-active');
            this._viewModel.sortByType();
            this.renderItems();
        });
        this.renderItems();
    }

    protected initialize() {
        super.initialize();
        App.TimelineEventsService.getItems(App.Config.listDocTypes).subscribe(items => {
            this._viewModel = new TimelineListViewModel({ items, sortingMode: 'byType' });
            console.log(this._viewModel);
        })
    }

    private renderItems() {
        this.getElement('list__body').innerHTML = this._viewModel.VisibleItems
            .map(item => this.getItemTemplate(item))
            .reduce((acc, item) => acc + item);
        this._viewModel.VisibleItems.forEach(item => {
            this.getElement(`list-item_${item.Id}`).addEventListener('click', (e: Event) => {
                Helpers.stopPropagation(e);
                App.RouterService.navigate(`info?id=${item.Id}&docType=${item.DocType}`);
            });
        })
    }

    private getItemTemplate(item: TimelineEventModel) {
        if (item instanceof TransactionModel) {
            return `
        <div class="list-item list-item_${item.Id}">
            <div class="list-item__amount ${
                item.Amount.Numeric > 0 ? 'list-item__amount_is-positive' : 'list-item__amount_is-negative'
                }">${item.Amount.Formatted}
            </div>
            <div class="list-item__title">${item.Title}</div>
            <div class="list-item__date">${item.getFormattedDate()}</div>
        </div>`;
        }
        if (item instanceof NewsItemModel) {
            return `
        <div class="list-item list-item_${item.Id}">
            <div class="list-item__title ${
                item.IsVisited ? 'list-item__title_is-visited' : ''
                }">${item.Title}</div>
        </div>`;
        }
    }

}
