import { Component, TemplateStateType } from "../component.base";
import { getFooterTemplate } from "./footer.component.template";

export class FooterComponent extends Component {

    protected getTemplate: (state: TemplateStateType) => string = getFooterTemplate;

}