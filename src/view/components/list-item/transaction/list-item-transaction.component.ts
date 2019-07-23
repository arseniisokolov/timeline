import { Component } from "../../../../../core-library/core/vanilla-components/component.base";
import { getListItemTransactionTemplate } from "./list-item-transaction.component.template";

export class ListItemTransactionComponent extends Component {

    protected getTemplate: (state: any) => string = getListItemTransactionTemplate;

    

}

