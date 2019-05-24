import { Page } from "../page.base";
import { Observable, of } from "rxjs";

//templates and styles
import { notFoundPageHtml } from "./not-found.page.html";
import './styles/not-found.master.scss';

export class NotFoundPage extends Page {

  protected pageBlockName: string = 'not-found';

  constructor() {
    super();
  }

  public initialize(): Observable<void> {
     
    return of(null);
  }

  public getTemplate(): string {
     
    return notFoundPageHtml;
  }

}
