import "./index.scss";
import { LayoutPage } from "./app/pages/layout/layout.page";

class App {

    private readonly _layout: LayoutPage

    constructor() {
        this._layout = new LayoutPage();
    }

}

const app = new App();

