import "./index.scss";
import { LayoutPage } from "./app/pages/layout/layout.page";
import { TransactionModel } from "./app/data/models/transaction.model";
import { TimelineEventsService } from "./app/data/services/timeline-events.service";

class Application {

    public TimelineEventsService: TimelineEventsService;
    private _layout: LayoutPage;

    constructor() {
        this.TimelineEventsService = new TimelineEventsService();

    }

    public start() {
        this._layout = new LayoutPage();
    }

}

export const App = new Application();

App.start();

