export abstract class Page {


    /** Имя корневого BEM-блока шаблона этой страницы */
    protected abstract blockName: string;
    /** Корневой BEM-блок шаблона этой страницы */
    protected block: Element;

    /** Выдает html-разметку страницы */
    public abstract getTemplate(): string;

    /** Срабатывает после отрисовки шаблона страницы */
    public initializeAfterRender() {
        this.block = this.getBlock(this.blockName);
    }

    protected initialize(urlParams?: URLSearchParams) {
    }

    /** Ищет BEM-блок по всему html приложения */
    protected getBlock(name: string): Element {
        return window.document.getElementsByClassName(name)[0];
    }

    /** Ищет BEM-элемент в пределах текущей страницы */
    protected getElement(name: string): Element {
        return this.block.getElementsByClassName(name)[0];
    }

}