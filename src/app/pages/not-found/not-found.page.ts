import { Page } from "../../data/models/page";

export class NotFoundPage extends Page {

  public getView(): string {
    return `<div class="not-found">
    <div class="not-found__title">Страница на найдена</div>  
  </div>`;
  }

}