import { ComponentStateType } from "../../../../core-library/core/vanilla-components/component.base";
import { Page } from "../../../../core-library/core/vanilla-components/page.base";
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";

//templates and styles
import { getMainPageTemplate } from "./main.page.template";

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
