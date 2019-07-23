import { TimelineEntriesService } from "../data/services/timeline-entries.service";
import { TimelineEntryTypes } from "../data/base/timeline-entry-types.enum";
import { RouterService } from "../../core-library/core/vanilla-components/router/router.service";
import { AppRoutingTree } from "./pages/app-routing-tree";

import "./styles/index.scss";

class Application {

    /** Конфигурация приложения */
    public Config = {
        /** Типы документов, которые будут загружены в ленту новостей */
        listDocTypes: [
            TimelineEntryTypes.Transaction,
            TimelineEntryTypes.News,
        ]
    };

    // singleton-классы
    public TimelineEntriesService: TimelineEntriesService;
    public RouterService: RouterService;

    constructor() {
        this.TimelineEntriesService = new TimelineEntriesService();
        this.RouterService = new RouterService({ AppRoutingTree, RootOutlet: 'layout__inner' });
    }

    public start() {
        this.RouterService.load()
    }

}

export const App = Object.freeze(new Application());

App.start();

