import { Component } from "../../../../../core-library/core/vanilla-components/component.base";
import { getListItemNewsTemplate } from "./list-item-news.component.template";

export class ListItemNewsComponent extends Component {

    protected getTemplate: (state: any) => string = getListItemNewsTemplate;

}