import { interval, Observable } from "rxjs";
import { takeUntil, first, tap, switchMapTo } from "rxjs/operators";

import { App } from "../../index";
import { TimelineListViewModel, ListSortingModes } from "../../../business-logic/timeline-list.view-model";
import { TransactionEntryModel } from "../../../data/models/transaction-entry.model";
import { TimelineEntryModel } from "../../../data/base/timeline-entry.model";
import { NewsEntryModel } from "../../../data/models/news-entry.model";
import { ListItemTransactionComponent } from "../../components/list-item/transaction/list-item-transaction.component";
import { ListItemNewsComponent } from "../../components/list-item/news/list-item-news.component";
import { Page } from "../../../../core-library/core/vanilla-components/page.base";
import { ComponentStateType, Component } from "../../../../core-library/core/vanilla-components/component.base";
import { Helpers } from "../../../../core-library/core/helpers";
import { ListFilterComponent } from "../../components/list-filter/list-filter.component";

//templates and styles
import { getListPageTemplate } from "./list.page.template";
import './styles/list.master.scss';

export class ListPage extends Page {

    private _viewModel: TimelineListViewModel;
    private _filterComponent: ListFilterComponent;

    constructor(state: ComponentStateType) {
        super(state);
    }

    protected getTemplate: (state: any) => string = getListPageTemplate;

    public initializeAfterRender() {
        if (!this._viewModel.IsInitialized)
            return;
        super.initializeAfterRender();
        this.checkTemplateEvents();
        this.checkForNewItems();
    }

    public initialize(): Observable<void> {
        this._viewModel = new TimelineListViewModel();
        return App.TimelineEntriesService.getItems(App.Config.listDocTypes)
            .pipe(
                takeUntil(this.subsKiller.Unsubscriber),
                tap(items => this._viewModel.initialize({ items, sortingMode: ListSortingModes.byDate })),
                switchMapTo(super.initialize())
            );
    }

    public initializeComponents() {
        super.initializeComponents();
        this._filterComponent = new ListFilterComponent({
            bemBlock: 'list__filter-bar',
            templateState: { sortingMode: this._viewModel.SortingMode }
        });
        this._filterComponent.renderTemplate();
        this.setFilterVisibility();
        this.setLoadingVisibility();
        this._viewModel.VisibleItems.forEach(item => this.renderListItem(item));
    }

    private renderListItem(item: TimelineEntryModel) {
        if (!item)
            return;
        const listElem = this.getElement('list__body');
        const itemBlock = `list-item_${item.Id}`;
        const node: Element = document.createElement('div');
        node.classList.add('list-item', itemBlock);
        listElem.insertBefore(node, listElem.firstChild);
        this.createComponent(item, itemBlock).renderTemplate();
        node.addEventListener('click', (e: Event) => {
            Helpers.stopPropagation(e);
            App.RouterService.navigate(`main/info?id=${item.Id}&docType=${item.DocType}`);
        });
    }

    private setLoadingVisibility() {
        const loader = this.getElement('list__loader');
        if (loader)
            loader.remove();
    }

    /** Фабрика
     * @pure
     */
    private createComponent(item: TimelineEntryModel, bemBlock: string): Component {
        if (item instanceof TransactionEntryModel) {
            return new ListItemTransactionComponent({ templateState: { Item: item }, bemBlock });
        }
        if (item instanceof NewsEntryModel) {
            return new ListItemNewsComponent({ templateState: { Item: item }, bemBlock });
        }
        return null;
    }

    private checkTemplateEvents() {
        this._filterComponent.Events.onFiltering
            .pipe(takeUntil(this.subsKiller.Unsubscriber))
            .subscribe(type => {
                this._viewModel.sortBy(type);
                this.getElement('list__body').innerHTML = '';
                this._viewModel.VisibleItems.forEach(item => this.renderListItem(item));
            });
    }

    private checkForNewItems() {
        interval(5000).pipe(takeUntil(this.subsKiller.Unsubscriber))
            .subscribe(() => {
                App.TimelineEntriesService.getItems(App.Config.listDocTypes, true).pipe(
                    first(),
                    takeUntil(this.subsKiller.Unsubscriber)
                )
                    .subscribe(items => {
                        if (!items.length)
                            return;
                        if (this._viewModel.SortingMode === ListSortingModes.byDate) {
                            this._viewModel.appendItems(items).forEach(item => this.renderListItem(item));
                        } else {
                            this._viewModel.appendItems(items)
                            this.getElement('list__body').innerHTML = '';
                            this._viewModel.VisibleItems.forEach(item => this.renderListItem(item));
                        }
                        this.setFilterVisibility();
                    });
            });
    }

    private setFilterVisibility() {
        if (!this._viewModel.IsInitialized || !this._viewModel.VisibleItems.length) {
            this.getElement('list__filter-bar').classList.add('list__filter-bar_is-hidden');
            return;
        }
        this.getElement('list__filter-bar').classList.remove('list__filter-bar_is-hidden');
    }

}
