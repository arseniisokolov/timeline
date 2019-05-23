import { Page } from "../../base/page";
import { ListPage } from "../list/list.page";
import { ListItemInfoPage } from "../list-item-info/list-item-info.page";
import { NotFoundPage } from "../not-found/not-found.page";

const Constants = {
    routerOutletElem: 'app-router-outlet'
}

export class LayoutPage {

    private _currentRoute: string;
    private _currentPage: Page;

    constructor() {
        this.loadRoute();
        this.checkBrowserButtons();
    }

    /** Загружает текущий роут */
    public loadRoute() {
        this._currentRoute = window.location.pathname;
        this._currentPage = this.getCurrentPage();
        this.renderPage();
    }

    public changeRoute(name: string) {
        window.history.pushState({}, "TimeLine", `/${name}`)
        this.loadRoute();
    }

    private getCurrentPage(): Page {
        switch (this._currentRoute) {
            case '/':
            case '/list': return new ListPage();
            case '/info': return new ListItemInfoPage();
            default: return new NotFoundPage();
        }
    }

    private renderPage() {
        if (!this._currentPage)
            return;
        const routerOutletEl: Element = window.document.getElementsByClassName(Constants.routerOutletElem)[0];
        routerOutletEl.innerHTML = this._currentPage.getTemplate();
        this._currentPage.initializeAfterRender();
    }

    private checkBrowserButtons() {
        window.addEventListener("popstate", (e: any) => {
            if (!e.state)
                return;
            if (window.location.pathname === this._currentRoute)
                return;
            this.loadRoute();
        });
    }

}