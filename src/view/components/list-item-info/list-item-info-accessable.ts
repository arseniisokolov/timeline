import { Subject } from "rxjs";
import { Component } from "../../../../core-library/core/vanilla-components/component.base";

export interface IListItemInfoAccessable extends Component {

    Events: {
        onBack: Subject<void>;
        onDelete?: Subject<void>;
        onAccept?: Subject<void>;
    };

}