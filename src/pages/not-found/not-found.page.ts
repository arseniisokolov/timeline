import { Page } from "../page.base";
import { ComponentStateType } from "../../components/component.base";

//templates and styles
import { getNotFoundPageTemplate } from "./not-found.page.template";
import './styles/not-found.master.scss';

export class NotFoundPage extends Page {

    constructor(state: ComponentStateType) {
        super(state);
    }

    public getTemplate: (state: any) => string = getNotFoundPageTemplate;

}
