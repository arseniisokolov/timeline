import { Page } from "../../base/page";
import { TimelineListViewModel } from "../../data/view-models/timeline-list.view-model";
import { App } from "../../../app";
import { TimelineDocTypes } from "../../data/base/timeline-doctypes.enum";

export class ListPage extends Page {

  private _viewModel: TimelineListViewModel;
  private _docTypes: TimelineDocTypes[] = [
    TimelineDocTypes.Transaction,
    TimelineDocTypes.News,
  ]

  constructor() {
    super();
    this.initialize();
  }

  private initialize() {
    App.TimelineEventsService.getItems(this._docTypes).subscribe(items => {
      this._viewModel = new TimelineListViewModel({ items });
      console.log(this._viewModel);
    })
  }

  public getView(): string {
    return `<div class="list">
        <div class="list__title">Список новостей и транзакций</div>  
      </div>`;
  }

}