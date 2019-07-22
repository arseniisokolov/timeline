import { Subject } from "rxjs";
import { Component } from "../../../../core-library/core/vanilla-components/component.base";

export interface IListItemInfoAccessable extends Component {

    EventEmitters: { onBack: Subject<void> };

}