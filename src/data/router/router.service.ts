import { Observable } from 'rxjs';
import { tap, first } from 'rxjs/operators';
import { Page } from '../../pages/page.base';
import { App } from '../../index/index';
import { AppRoutingTree } from '../../pages/app-routing-tree';
import { NotFoundRoute } from './router.types';
import { CurrentRouteModel } from './current-route.model';

/** TO DO: сейчас при каждом load дерево перерисовывается полностью. Добавить умную проверку рутов. */
export class RouterService {

    /** Текущий узел дерева рутов */
    private _currentRoute: CurrentRouteModel;
    /** Текущая часть сроки запроса */
    private _currentPathPart: string;
    private _path: string[];

    constructor() {
        this._currentRoute = new CurrentRouteModel();
        this.checkBrowserButtons();
    }

    /** Загружает текущий рут */
    public load() {
        this.initializePathPart();
        this._currentRoute.initialize(AppRoutingTree, App.Config.routerOutletBlock, this._currentPathPart);
        this.handlePathPartLoop();
    }

    /** Перейти на рут */
    public navigate(name: string) {
        this._path = window.location.pathname.replace('/', '').split('/');
        window.history.pushState({}, "", `${window.location.origin}/${name}`)
        this.load();
    }

    /** Выдает текущие параметры строки запроса */
    public getParams(): URLSearchParams {
        return new URLSearchParams(window.location.search);
    }

    /** Обрабатывает текущую часть url согласно инструкции из дерева рутов */
    private handlePathPartLoop() {
        if (!this._currentRoute.Node) {
            this.renderNotFoundPage();
            return;
        }
        if (this._currentRoute.Node.redirectTo) {
            this.navigate(this._currentRoute.Node.redirectTo);
            return;
        }
        const currentPage = this._currentRoute.createPage();
        this.renderPage(currentPage)
            .pipe(first())
            .subscribe(() => {
                this.switchPathPart();
                if (!this._currentRoute.Node.children)
                    return;
                if (!this._currentPathPart && this._currentRoute.hasRedirect())
                    return;
                this._currentRoute.initialize(this._currentRoute.Node.children, currentPage.getInnerRouterOutletBlock(), this._currentPathPart);
                this.handlePathPartLoop();
            });
    }

    private renderPage(page: Page): Observable<void> {
        return page.initialize().pipe(tap(() => page.initializeAfterRender()));
    }

    /** Переход на страницу 404 */
    private renderNotFoundPage() {
        const notFoundPage = AppRoutingTree[NotFoundRoute as unknown as string].Page; // обходим баг TS: https://github.com/Microsoft/TypeScript/issues/24587
        this.renderPage(new notFoundPage({ bemBlock: App.Config.routerOutletBlock }))
            .pipe(first())
            .subscribe();
    }

    private initializePathPart() {
        this._path = window.location.pathname.replace('/', '').split('/');
        this._currentPathPart = this._path[0];
    }

    private switchPathPart() {
        const currentIndex = this._path.indexOf(this._currentPathPart);
        this._currentPathPart = this._path[currentIndex + 1] || '';
    }

    /** Отслеживает переходы вперед/назад в браузере */
    private checkBrowserButtons() {
        window.addEventListener("popstate", () => {
            if (window.location.pathname === this._currentPathPart)
                return;
            this.load();
        });
    }

}