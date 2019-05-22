import { Page } from "../../data/models/page";

export class ListItemInfoPage extends Page {

    private _testTitle: string = new Date().toTimeString();

    public getView(): string {
        return `<div class="list-item-info">
        <div class="list-item-info__title">
            ${this._testTitle}
        </div>
    </div>`;
    }

}