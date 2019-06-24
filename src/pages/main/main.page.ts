import { Observable, of } from "rxjs";

import { Page } from "../page.base";

//templates and styles
import { getMainPageHtml } from "./main.page.template";
import { HeaderComponent } from "../../components/header/header.component";
import { TemplateStateType } from "../../components/component.base";

export class MainPage extends Page {

    constructor() {
        super({
            bemBlock: 'layout__inner',
            templateState: { Title: '...' },
        });
    }

    protected getTemplate: (state: TemplateStateType) => string = getMainPageHtml;

    public initializeAfterRender() {
        super.initializeAfterRender();
        const headerElem = new HeaderComponent({
            bemBlock: 'layout__header',
            templateState: { Title: 'Лента оповещений' },
        });
        headerElem.renderTemplate();
    }

    public initialize(): Observable<void> {
        this.renderTemplate();
        return of(null);
    }

}
