import { TimelineEventsService } from "../data/services/timeline-events.service";
import { TimelineDocTypes } from "../data/base/timeline-doc-types.enum";
import { RouterService } from "../../core-library/core/vanilla-components/router/router.service";
import { AppRoutingTree } from "../pages/app-routing-tree";

import "./styles/index.scss";

class Application {

    /** Конфигурация приложения */
    public Config = {
        /** Типы документов, которые будут загружены в ленту новостей */
        listDocTypes: [
            TimelineDocTypes.Transaction,
            TimelineDocTypes.News,
        ]
    };

    // singleton-классы
    public TimelineEventsService: TimelineEventsService;
    public RouterService: RouterService;

    constructor() {
        this.TimelineEventsService = new TimelineEventsService();
        this.RouterService = new RouterService({ AppRoutingTree, RootOutlet: 'layout__inner' });
    }

    public start() {
        this.RouterService.load()
    }

}

export const App = Object.freeze(new Application());

App.start();

