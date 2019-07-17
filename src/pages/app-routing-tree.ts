import { MainPage } from "./main/main.page";
import { ListPage } from "./list/list.page";
import { ListItemInfoPage } from "./list-item-info/list-item-info.page";
import { NotFoundPage } from "./not-found/not-found.page";
import { RoutingTreeType, NotFoundRoute } from "../../core-library/core/vanilla-components/router/router.types";


/** Дерево рутов приложения */
export const AppRoutingTree: RoutingTreeType = {
    [NotFoundRoute]: { Page: NotFoundPage },
    '': { redirectTo: 'main' },
    'main': {
        Page: MainPage,
        children: {
            '': { redirectTo: 'main/list' },
            'list': { Page: ListPage },
            'info': { Page: ListItemInfoPage },
        }
    },
};