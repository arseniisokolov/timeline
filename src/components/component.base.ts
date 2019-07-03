import { SubscriptionsKiller } from "../data/base/subscriptions-killer";

export abstract class Component {

    public IsInitialized: boolean;
    public get State(): ComponentStateType {
        return this.state;
    }
    protected state: ComponentStateType;
    protected bemBlockElem: Element;

    protected abstract getTemplate: (state: TemplateStateType) => string;
    protected subsKiller = new SubscriptionsKiller();

    constructor(state: ComponentStateType) {
        if (!state.bemBlock)
            throw 'Component: You did not provide an element to make into a component.';
        this.state = state;
        this.bemBlockElem = this.getBlock(state.bemBlock);
        this.initLifecycleHooks();
    }

    public replaceState(state: ComponentStateType) {
        this.state = { ...this.state, ...state };
        this.renderTemplate();
    }

    // public sanitizeHtml(str: string): string {
    //     let temp = document.createElement('div');
    //     temp.textContent = str;
    //     return temp.innerHTML;
    // }

    public renderTemplate(): void {
        if (!this.State.bemBlock)
            return;
        const template = this.getTemplate(this.State.templateState);
        if (this.bemBlockElem.innerHTML === template)
            return;
        this.bemBlockElem.innerHTML = template;
        this.registerRenderEvent();
    }

    protected onInit() {
        this.IsInitialized = true;
    }

    protected onDestroy() {
        this.subsKiller.killAllSubscriptions();
    }

    protected initLifecycleHooks() {
        document.addEventListener('DOMContentLoaded', () => this.onInit());
        window.onbeforeunload = () => this.onDestroy();
    }

    /** Ищет BEM-блок по всему html приложения */
    protected getBlock(name: string): Element {
        return window.document.getElementsByClassName(name)[0];
    }

    /** Ищет BEM-элемент в пределах текущей страницы */
    protected getElement(name: string): Element {
        return this.bemBlockElem.getElementsByClassName(name)[0];
    }

    /** https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent */
    private registerRenderEvent() {
        if (typeof CustomEvent !== 'function')
            return;
        this.bemBlockElem.dispatchEvent(
            new CustomEvent('render', {
                bubbles: true
            })
        );
    }

}

export type ComponentStateType = {
    bemBlock: string;
    templateState: TemplateStateType;
    data?: any & {};
}


export type TemplateStateType = {
    Title?: string;
    Caption?: string;
};