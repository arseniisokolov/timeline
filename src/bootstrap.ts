import "./index.scss";
import { LayoutPage } from "./app/pages/layout/layout.page";

class Bootstrap {

    private _layout: LayoutPage

    constructor() {
        this._layout = new LayoutPage();
    }

}

var bootstrap = new Bootstrap();

