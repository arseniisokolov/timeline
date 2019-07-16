import { Component } from "../../component.base";
import { getListItemInfoTransactionTemplate } from "./list-item-info-transaction.component.template";

export class ListItemInfoTransactionComponent extends Component {

    protected getTemplate: (state: any) => string = getListItemInfoTransactionTemplate;

}

