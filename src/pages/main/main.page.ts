import { Observable, of } from "rxjs";

import { Page } from "../page.base";

//templates and styles
import { getMainPageHtml } from "./main.page.template";
import { HeaderComponent } from "../../components/header/header.component";
import { TemplateStateType } from "../../components/component.base";
import { FooterComponent } from "../../components/footer/footer.component";

export class MainPage extends Page {

    constructor() {
        super({
            bemBlock: 'layout__inner',
            templateState: {},
        });
    }

    protected getTemplate: (state: TemplateStateType) => string = getMainPageHtml;

    public initializeAfterRender() {
        super.initializeAfterRender();
        const headerBlock = new HeaderComponent({
            bemBlock: 'layout__header',
            templateState: { Title: 'Лента оповещений' },
        });
        const footerBlock = new FooterComponent({
            bemBlock: 'layout__footer',
            templateState: {}
        });
        headerBlock.renderTemplate();
        footerBlock.renderTemplate();
    }

    public initialize(): Observable<void> {
        this.renderTemplate();
        return of(null);
    }

}
