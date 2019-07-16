import { Page } from "../page.base";

//templates and styles
import { getMainPageTemplate } from "./main.page.template";
import { HeaderComponent } from "../../components/header/header.component";
import { ComponentStateType } from "../../components/component.base";
import { FooterComponent } from "../../components/footer/footer.component";

export class MainPage extends Page {

    constructor(state: ComponentStateType) {
        super(state);
    }

    protected getTemplate: (state: any) => string = getMainPageTemplate;

    public initializeComponents() {
        super.initializeComponents();
        new HeaderComponent({
            bemBlock: 'layout__header',
            templateState: { Title: 'Лента оповещений' },
        }).renderTemplate();
        new FooterComponent({
            bemBlock: 'layout__footer',
            templateState: {}
        }).renderTemplate();
    }

}
