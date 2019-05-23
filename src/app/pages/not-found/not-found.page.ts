import { Page } from "../../base/page";
import { notFoundPageHtml } from "./not-found.page.html";

export class NotFoundPage extends Page {

  protected blockName: string = 'not-found';

  constructor() {
    super();
    this.initialize();
  }

  public getTemplate(): string {
    return notFoundPageHtml;
  }

}