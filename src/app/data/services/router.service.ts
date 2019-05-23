import { Page } from '../../pages/page.base';
import { ListPage } from '../../pages/list/list.page';
import { ListItemInfoPage } from '../../pages/list-item-info/list-item-info.page';
import { NotFoundPage } from '../../pages/not-found/not-found.page';
import { App } from '../../..';

export class RouterService {

    private _currentRoute: string;
    private _currentPage: Page;

    constructor() {
        this.checkBrowserButtons();
    }

    /** Загружает текущий роут */
    public loadRoute() {
        this._currentRoute = window.location.pathname;
        this._currentPage = this.getCurrentPage();
        this.renderPage();
    }

    /** Изменить текущий роут */
    public navigate(name: string) {
        window.history.pushState({}, "TimeLine", `${window.location.origin}/${name}`)
        this.loadRoute();
    }

    public getRouteParams(): URLSearchParams {
        return new URLSearchParams(window.location.search);
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
        const routerOutletBlock = window.document.getElementsByClassName(App.Config.routerOutletElem)[0];
        if (!routerOutletBlock)
            return;
        routerOutletBlock.innerHTML = this._currentPage.getTemplate();
        this._currentPage.initializeAfterRender();
    }

    private checkBrowserButtons() {
        window.addEventListener("popstate", () => {
            if (window.location.pathname === this._currentRoute)
                return;
            this.loadRoute();
        });
    }

}