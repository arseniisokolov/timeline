import { Page } from "../page.base";
import { Observable, of } from "rxjs";
import { ComponentStateType, TemplateStateType } from "../../components/component.base";

//templates and styles
import { getNotFoundPageTemplate } from "./not-found.page.template";
import './styles/not-found.master.scss';

export class NotFoundPage extends Page {

    constructor(state: ComponentStateType) {
        super(state);
    }

    public getTemplate: (state: TemplateStateType) => string = getNotFoundPageTemplate;

}
