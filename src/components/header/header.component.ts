import { Component } from "../component.base";
import { getHeaderTemplate } from "./header.component.template";

export class HeaderComponent extends Component {

    protected getTemplate: (state: any) => string = getHeaderTemplate;

}