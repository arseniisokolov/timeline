import { ComponentStateType } from "../../components/component.base";
import { Page } from "../../pages/page.base";

/** Символ для страницы 404 */
export const NotFoundRoute: unique symbol = Symbol('404');

/** Дерево рутов приложения */
export type RoutingTreeType = RoutingTreeBranchType & {
    [NotFoundRoute]: { Page: PageConstructorType }
};

/** Ветвь дерева рутов приложения */
export type RoutingTreeBranchType = {
    [path: string]: RouteNode
};

/** Функция-конструктор конкретных страниц */
export type PageConstructorType = new (state: ComponentStateType) => Page;

export type RouteNode = {
    /** Функция-конструктор страницы */
    Page?: PageConstructorType,
    /** Дочерние руты в виде ветви дерева */
    children?: RoutingTreeBranchType,
    /** Редирект на другой рут */
    redirectTo?: string,
}