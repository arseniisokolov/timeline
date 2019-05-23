import { Page } from "../page.base";

//templates and styles
import { notFoundPageHtml } from "./not-found.page.html";
import './styles/not-found.master.scss';

export class NotFoundPage extends Page {

  protected pageBlockName: string = 'not-found';

  constructor() {
    super();
    this.initialize();
  }

  public getTemplate(): string {
    return notFoundPageHtml;
  }

}