import { Page } from "../../pages/page.base";
import { RoutingTreeBranchType, RouteNode } from "./router.types";

/** Инкапсулирует состояние и логику текущего узла дерева рутов */
export class CurrentRouteModel {

    public get Node(): RouteNode {
        return this._node;
    }
    private _routerOutletBlock: string;
    private _routingTree: RoutingTreeBranchType;
    private _node: RouteNode;

    public initialize(tree: RoutingTreeBranchType, outlet: string, pathPart: string) {
        this._routingTree = tree;
        this._routerOutletBlock = outlet;
        this._node = this._routingTree[pathPart];
    }

    public createPage(): Page {
        return new this.Node.Page({ bemBlock: this._routerOutletBlock });
    }

    public withRedirect(): boolean {
        if (!this._node)
            return true;
        return !this._node.children[''];
    }

}