import { Observable, Subject } from "rxjs";

export abstract class Page {

    /** Имя корневого BEM-блока шаблона этой страницы */
    protected abstract pageBlockName: string;
    /** Корневой BEM-блок шаблона этой страницы */
    protected pageBlock: Element;
    protected _unsubscriber: Subject<void> = new Subject<void>();

    /** Выдает html-разметку страницы */
    public abstract getTemplate(): string;

    /** Инициализация после отрисовки */
    public initializeAfterRender() {
        this.pageBlock = this.getBlock(this.pageBlockName);
    }

    /** Отписаться от всех асинхронных подписок */
    public unsubscribeAll() {
        this._unsubscriber.next();
        this._unsubscriber.complete();
    }

    /** Инициализация до отрисовки */
    public abstract initialize(): Observable<void>;

    /** Ищет BEM-блок по всему html приложения */
    protected getBlock(name: string): Element {
        return window.document.getElementsByClassName(name)[0];
    }

    /** Ищет BEM-элемент в пределах текущей страницы */
    protected getElement(name: string): Element {
        return this.pageBlock.getElementsByClassName(name)[0];
    }

}