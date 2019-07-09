import { Observable } from 'rxjs';
import { tap, first } from 'rxjs/operators';
import { Page } from '../../pages/page.base';
import { App } from '../../index/index';
import { AppRoutingTree } from '../../pages/app-routing-tree';
import { RoutingTreeType, RoutingTreeBranchType, PageConstructorType, NotFoundRoute } from './router.types';

/** TO DO: сейчас при каждом loadRoute дерево перерисовывается полностью. Добавить умную проверку рутов. */
export class RouterService {

    private _currentPage: Page;
    private _currentPath: string;
    private _currentRouteNode: string;
    private _routes: string[];
    private _currentRouterOutlet: string;
    private _currentRoutingTree: RoutingTreeType | RoutingTreeBranchType;
    private _notFoundPage: PageConstructorType;

    constructor() {
        this.checkBrowserButtons();
    }

    /** Загружает текущий рут */
    public loadRoute() {
        this._currentPath = window.location.pathname.replace('/', '');
        this._routes = this._currentPath.split('/');
        this._currentRouteNode = this._routes[0];
        this._currentRoutingTree = AppRoutingTree;
        this._notFoundPage = this._currentRoutingTree[NotFoundRoute as unknown as string].Page; // обходим баг TS: https://github.com/Microsoft/TypeScript/issues/24587
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
            this.renderNotFoundPage();
            return;
        }
        if (routeNode.redirectTo) {
            this.navigate(routeNode.redirectTo);
            return;
        }
        this._currentPage = new routeNode.Page({ bemBlock: this._currentRouterOutlet });
        this.renderPage(this._currentPage)
            .pipe(first())
            .subscribe(() => {
                const currentIndex = this._routes.indexOf(this._currentRouteNode);
                this._currentRouteNode = this._routes[currentIndex + 1] || '';
                const isLastAndWithoutRedirect = !routeNode.children || !this._currentRouteNode && !routeNode.children[''];
                if (isLastAndWithoutRedirect)
                    return;
                this._currentRouterOutlet = this._currentPage.getInnerRouterOutletBlock();
                this._currentRoutingTree = routeNode.children;
                this.handleRouteNode();
            });
    }

    private renderNotFoundPage() {
        this._currentPage = new this._notFoundPage({ bemBlock: App.Config.routerOutletElem });
        this.renderPage(this._currentPage).pipe(first()).subscribe();
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