import { Page } from "../page.base";

//templates and styles
import { notFoundPageHtml } from "./not-found.page.html";
import './styles/not-found.master.scss';
import { Observable, of } from "rxjs";

export class NotFoundPage extends Page {

  protected pageBlockName: string = 'not-found';

  constructor() {
    super();
  }

  public initialize(): Observable<void> {
    return of();
  }

  public getTemplate(): string {
    return notFoundPageHtml;
  }

}