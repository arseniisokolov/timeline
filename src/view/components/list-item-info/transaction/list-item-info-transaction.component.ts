import { Subject } from "rxjs";
import { Component } from "../../../../../core-library/core/vanilla-components/component.base";
import { getListItemInfoTransactionTemplate } from "./list-item-info-transaction.component.template";
import { IListItemInfoAccessable } from "../list-item-info-accessable";

export class ListItemInfoTransactionComponent extends Component implements IListItemInfoAccessable {

    public EventEmitters = { onBack: new Subject<void>() };

    protected getTemplate: (state: any) => string = getListItemInfoTransactionTemplate;

    protected onRendered() {
        this.getElement('item-info__btn_back').addEventListener('click', this.registerCallback('onBack', () => {
            this.EventEmitters.onBack.next();
            this.EventEmitters.onBack.complete();
        }));
    }

    protected onDestroy() {
        this.getElement('item-info__btn_back').removeEventListener('click', this.getCallback('onBack'));
    }

}

