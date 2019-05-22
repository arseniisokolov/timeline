import { Page } from "../../base/page";

export class ListPage extends Page {

    public getView(): string {
        return `<div class="list">
        <div class="list__title">Список новостей и транзакций</div>  
      </div>`;
    }

}