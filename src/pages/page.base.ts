import { Observable } from "rxjs";
import { Component } from "../components/component.base";

/** TO DO: расширить интерфейс, чтобы обеспечить встраивание в цепочку роутинга */
export abstract class Page extends Component {

    /** Инициализация после отрисовки */
    public initializeAfterRender() {

    }

    /** Инициализация до отрисовки */
    public abstract initialize(): Observable<void>;

}