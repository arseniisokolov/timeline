import { LayoutPage } from "./app/pages/layout/layout.page";
import { TimelineEventsService } from "./app/data/services/timeline-events.service";

import "./index.scss";

class Application {

    public TimelineEventsService: TimelineEventsService;
    public _layout: LayoutPage;

    constructor() {
        this.TimelineEventsService = new TimelineEventsService();

    }

    public start() {
        this._layout = new LayoutPage();
    }

}

export const App = new Application();

App.start();

