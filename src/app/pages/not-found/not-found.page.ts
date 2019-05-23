import { Page } from "../page.base";
import { notFoundPageHtml } from "./not-found.page.html";

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