import { Page } from "../../base/page";
import { listItemInfoPageHtml } from "./list-item-info.page.html";
import { TimelineEventModel } from "../../data/base/timeline-event.model";
import { App } from "../../../app";
import { TimelineDocTypes } from "../../data/base/timeline-doctypes.enum";

export class ListItemInfoPage extends Page {

    protected blockName: string = 'list-item-info';
    private _model: TimelineEventModel;

    private _routeParams: { itemId: string, docType: TimelineDocTypes };

    constructor(urlParams?: URLSearchParams) {
        super();
        this.initialize(urlParams);
    }

    public getTemplate(): string {
        return listItemInfoPageHtml;
    }

    public initializeAfterRender() {
        super.initializeAfterRender();
        if (!this._routeParams.itemId || !this._routeParams.docType)
            return;
        App.TimelineEventsService.getItemById(this._routeParams.docType, this._routeParams.itemId)
            .subscribe((item: TimelineEventModel) => {
                if (!item)
                    return;
                this._model = item;
                this.getElement('list-item-info__title').innerHTML = this._model.Title;
                this.getElement('list-item-info__description').innerHTML = this._model.Description;
            }); 
    }

    protected initialize(urlParams?: URLSearchParams) {
        super.initialize(urlParams);
        this._routeParams = {
            itemId: urlParams.get('id'),
            docType: urlParams.get('docType') as TimelineDocTypes
        };
    }

}