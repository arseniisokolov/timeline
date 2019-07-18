
import { Component } from "../../../../core-library/core/vanilla-components/component.base";
import { getFooterTemplate } from "./footer.component.template";

export class FooterComponent extends Component {

    protected getTemplate: (state: any) => string = getFooterTemplate;

}