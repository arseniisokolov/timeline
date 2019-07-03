import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Page } from '../../pages/page.base';
import { App } from '../../index/index';
import { AppRoutingTree, RoutingTreeType } from '../../pages/routing-tree';
import { NotFoundPage } from '../../pages/not-found/not-found.page';

/** TO DO: сейчас при каждом loadRoute дерево перерисовывается полностью. Добавить умную проверку рутов. */
export class RouterService {

    private _currentPage: Page;
    private _currentPath: string;
    private _currentRouteNode: string;
    private _routes: string[];
    private _currentRouterOutlet: string;
    private _currentRoutingTree: RoutingTreeType;

    constructor() {
        this.checkBrowserButtons();
    }

    /** Загружает текущий рут */
    public loadRoute() {
        this._currentPath = window.location.pathname.replace('/', '');
        this._routes = this._currentPath.split('/');
        this._currentRouteNode = this._routes[0];
        if (!this._currentRouteNode)
            this.navigate('main');
        this._currentRoutingTree = AppRoutingTree;
        this._currentRouterOutlet = App.Config.routerOutletElem;
        this.handleRouteNode();
    }

    /** Перейти на рут */
    public navigate(name: string) {
        window.history.pushState({}, "", `${window.location.origin}/${name}`)
        this.loadRoute();
    }

    /** Выдает текущие параметры строки запроса */
    public getRouteParams(): URLSearchParams {
        return new URLSearchParams(window.location.search);
    }

    private handleRouteNode() {
        const routeNode = this._currentRoutingTree[this._currentRouteNode];
        if (!routeNode) {
            this._currentPage = new NotFoundPage({ bemBlock: this._currentRouterOutlet });
            this.renderPage(this._currentPage).subscribe();
            return;
        }
        this._currentPage = routeNode.getPage({ bemBlock: this._currentRouterOutlet });
        this.renderPage(this._currentPage).subscribe(() => {
            /** TO DO: сделать так, чтобы аутлет искался не по классу, а просто брался текущий элемент */
            const currentIndex = this._routes.indexOf(this._currentRouteNode);
            this._currentRouteNode = this._routes[currentIndex + 1];
            const routerOutletElem = this._currentPage.getBemBlock().querySelector('[router-outlet]');
            if (!routeNode.children)
                return;
            this._currentRouterOutlet = routerOutletElem.className;
            this._currentRoutingTree = routeNode.children;
            this.handleRouteNode();
        });
    }

    private renderPage(page: Page): Observable<void> {
        return page.initialize().pipe(tap(() => page.initializeAfterRender()));
    }

    /** Отслеживает переходы вперед/назад в браузере */
    private checkBrowserButtons() {
        window.addEventListener("popstate", () => {
            if (window.location.pathname === this._currentPath)
                return;
            this.loadRoute();
        });
    }

}