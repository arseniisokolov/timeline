import { Observable, of } from "rxjs";
import { Component } from "../components/component.base";

/** TO DO: расширить интерфейс, чтобы обеспечить встраивание в цепочку роутинга */
export abstract class Page extends Component {

    /** Инициализация после отрисовки */
    public initializeAfterRender() {
        this.initializeComponents();
    }

    /** Инициализация и отрисовка */
    public initialize(): Observable<void> {
        this.renderTemplate();
        return of(null);
    };

    public getBemBlock(): Element {
        return this.bemBlockElem;
    }

    protected initializeComponents() {
        
    }

}