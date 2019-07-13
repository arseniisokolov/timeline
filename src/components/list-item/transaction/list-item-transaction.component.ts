import { Component } from "../../component.base";
import { getListItemTransactionTemplate } from "./list-item-transaction.component.template";

export class ListItemTransactionComponent extends Component {

    protected getTemplate: (state: any) => string = getListItemTransactionTemplate;

}

