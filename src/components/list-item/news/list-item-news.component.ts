import { Component } from "../../component.base";
import { getListItemNewsTemplate } from "./list-item-news.component.template";

export class ListItemNewsComponent extends Component {

    protected getTemplate: (state: any) => string = getListItemNewsTemplate;

}