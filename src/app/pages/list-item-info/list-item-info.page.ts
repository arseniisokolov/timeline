import { Page } from "../../base/page";
import { listItemInfoPageHtml } from "./list-item-info.page.html";

export class ListItemInfoPage extends Page {

    protected blockName: string = 'list-item-info';
    // private _viewModel: TimelineListViewModel;

    constructor() {
        super();
        this.initialize();
    }

    public getTemplate(): string {
        return listItemInfoPageHtml;
    }

    public initializeAfterRender() {
    }

    protected initialize() {
        super.initialize();
    }

}