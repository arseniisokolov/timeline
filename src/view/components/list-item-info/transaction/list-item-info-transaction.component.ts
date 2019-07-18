import { Component } from "../../../../../core-library/core/vanilla-components/component.base";
import { getListItemInfoTransactionTemplate } from "./list-item-info-transaction.component.template";

export class ListItemInfoTransactionComponent extends Component {

    protected getTemplate: (state: any) => string = getListItemInfoTransactionTemplate;

}

