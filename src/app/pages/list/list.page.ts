import { Page } from "../../base/page";
import { TimelineListViewModel } from "../../data/view-models/timeline-list.view-model";
import { App } from "../../../app";
import { TimelineDocTypes } from "../../data/base/timeline-doctypes.enum";

import { listPageHtml } from "./list.page.html";

export class ListPage extends Page {

  protected blockName: string = 'list';
  private _viewModel: TimelineListViewModel;
  private _docTypes: TimelineDocTypes[] = [
    TimelineDocTypes.Transaction,
    TimelineDocTypes.News,
  ]

  constructor() {
    super();
    this.initialize();
  }

  public getTemplate(): string {
    return listPageHtml;
  }

  public initializeAfterRender() {
    super.initializeAfterRender();
    this.getElement('filter-bar__item_by-date').addEventListener('click', () => { this._viewModel.sortByDate(), console.log(this._viewModel) });
    this.getElement('filter-bar__item_by-type').addEventListener('click', () => { this._viewModel.sortByType(), console.log(this._viewModel) });
  }

  protected initialize() {
    super.initialize();
    App.TimelineEventsService.getItems(this._docTypes).subscribe(items => {
      this._viewModel = new TimelineListViewModel({ items, sortingMode: 'byType' });
      console.log(this._viewModel);
    })
  }

}