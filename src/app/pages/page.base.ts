export abstract class Page {


    /** Имя корневого BEM-блока шаблона этой страницы */
    protected abstract pageBlockName: string;
    /** Корневой BEM-блок шаблона этой страницы */
    protected pageBlock: Element;

    /** Выдает html-разметку страницы */
    public abstract getTemplate(): string;

    /** Срабатывает после отрисовки шаблона страницы */
    public initializeAfterRender() {
        this.pageBlock = this.getBlock(this.pageBlockName);
    }

    protected initialize() {
    }

    /** Ищет BEM-блок по всему html приложения */
    protected getBlock(name: string): Element {
        return window.document.getElementsByClassName(name)[0];
    }

    /** Ищет BEM-элемент в пределах текущей страницы */
    protected getElement(name: string): Element {
        return this.pageBlock.getElementsByClassName(name)[0];
    }

}