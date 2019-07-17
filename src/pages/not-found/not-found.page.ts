import { Page } from "../../../core-library/core/vanilla-components/page.base";
import { ComponentStateType } from "../../../core-library/core/vanilla-components/component.base";

//templates and styles
import { getNotFoundPageTemplate } from "./not-found.page.template";
import './styles/not-found.master.scss';

export class NotFoundPage extends Page {

    constructor(state: ComponentStateType) {
        super(state);
    }

    public getTemplate: (state: any) => string = getNotFoundPageTemplate;

}
