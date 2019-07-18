import { Component } from "../../../../../core-library/core/vanilla-components/component.base";
import { getListItemInfoNewsTemplate } from "./list-item-info-news.component.template";

export class ListItemInfoNewsComponent extends Component {

    protected getTemplate: (state: any) => string = getListItemInfoNewsTemplate;

}

