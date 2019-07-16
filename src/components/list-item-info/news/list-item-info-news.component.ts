import { Component } from "../../component.base";
import { getListItemInfoNewsTemplate } from "./list-item-info-news.component.template";

export class ListItemInfoNewsComponent extends Component {

    protected getTemplate: (state: any) => string = getListItemInfoNewsTemplate;

}

