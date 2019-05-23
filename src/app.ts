import { TimelineEventsService } from "./app/data/services/timeline-events.service";
import { RouterService } from "./app/data/services/router.service";
import { TimelineDocTypes } from "./app/data/base/timeline-doctypes.enum";

import "./index.scss";

class Application {

    /** Конфигурация приложения */
    public Config = {
        /** Типы документов, которые будут загружены в ленту новостей */
        listDocTypes: [
            TimelineDocTypes.Transaction,
            TimelineDocTypes.News,
        ],
        /** Имя BEM-блока router-outlet */
        routerOutletElem: 'app-router-outlet',
    };

    // singleton-классы
    public TimelineEventsService: TimelineEventsService;
    public RouterService: RouterService;

    constructor() {
        this.TimelineEventsService = new TimelineEventsService();
        this.RouterService = new RouterService();
    }

    public start() {
        this.RouterService.loadRoute()
    }

}

export const App = new Application();

App.start();

