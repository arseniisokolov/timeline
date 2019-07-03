import { MainPage } from "./main/main.page";
import { Page } from "./page.base";
import { ListPage } from "./list/list.page";
import { ListItemInfoPage } from "./list-item-info/list-item-info.page";
import { ComponentStateType } from "../components/component.base";

/** TO DO: добавить поддержку redirectTo и notFound */
export const AppRoutingTree: RoutingTreeType = {
    'main': {
        getPage: (state: ComponentStateType) => new MainPage(state),
        children: {
            'list': { getPage: (state: ComponentStateType) => new ListPage(state) },
            'info': { getPage: (state: ComponentStateType) => new ListItemInfoPage(state) },
        }
    },
};

export type RoutingTreeType = { [path: string]: { getPage: (state: ComponentStateType) => Page, children?: RoutingTreeType } };