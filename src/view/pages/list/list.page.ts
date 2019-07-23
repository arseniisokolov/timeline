import { interval, Observable } from "rxjs";
import { takeUntil, first, tap, switchMapTo } from "rxjs/operators";

import { App } from "../../index";
import { TimelineListViewModel, ListSortingModes } from "../../../business-logic/timeline-list.view-model";
import { TimelineEntryModel } from "../../../data/base/timeline-entry.model";
import { Page } from "../../../../core-library/core/vanilla-components/page.base";
import { ComponentStateType, Component } from "../../../../core-library/core/vanilla-components/component.base";
import { ListFilterComponent } from "../../components/list-filter/list-filter.component";
import { ListItemEntryComponent } from "../../components/list-item/list-item-entry.component";

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
        const itemBemModifier = `list-item_${item.Id}`;
        const listItemElem: Element = document.createElement('div');
        listItemElem.classList.add('list-item', itemBemModifier);
        listElem.insertBefore(listItemElem, listElem.firstChild);
        const component = new ListItemEntryComponent({
            templateState: { Item: item }, bemBlock: itemBemModifier
        });
        component.renderTemplate();
        component.Events.onSelect
            .pipe(takeUntil(this.subsKiller.Unsubscriber))
            .subscribe(() => {
                App.RouterService.navigate(`main/info?id=${item.Id}&docType=${item.DocType}`);
            });
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
                        this.setLoadingVisibility();
                    });
            });
    }

    private setLoadingVisibility() {
        if (!this._viewModel.IsInitialized || !this._viewModel.VisibleItems.length) {
            return;
        }
        const loader = this.getElement('list__loader');
        if (loader)
            loader.remove();
    }

    private setFilterVisibility() {
        if (!this._viewModel.IsInitialized || !this._viewModel.VisibleItems.length) {
            this.getElement('list__filter-bar').classList.add('list__filter-bar_is-hidden');
            return;
        }
        this.getElement('list__filter-bar').classList.remove('list__filter-bar_is-hidden');
    }

}
