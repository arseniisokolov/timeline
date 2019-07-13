import { TimelineEventsService } from "../data/services/timeline-events.service";
import { RouterService } from "../data/router/router.service";
import { TimelineDocTypes } from "../data/base/timeline-doc-types.enum";

import "./styles/index.scss";

class Application {

    /** Конфигурация приложения */
    public Config = {
        /** Типы документов, которые будут загружены в ленту новостей */
        listDocTypes: [
            TimelineDocTypes.Transaction,
            TimelineDocTypes.News,
        ],
        /** Имя BEM-блока router-outlet */
        routerOutletBlock: 'layout__inner',
    };

    // singleton-классы
    public TimelineEventsService: TimelineEventsService;
    public RouterService: RouterService;

    constructor() {
        this.TimelineEventsService = new TimelineEventsService();
        this.RouterService = new RouterService();
    }

    public start() {
        this.RouterService.load()
    }

}

export const App = new Application();

App.start();

