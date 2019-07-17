import { Component } from "../../../core-library/core/vanilla-components/component.base";
import { getHeaderTemplate } from "./header.component.template";

export class HeaderComponent extends Component {

    protected getTemplate: (state: any) => string = getHeaderTemplate;

}