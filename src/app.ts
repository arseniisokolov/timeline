import "./index.scss";
import { LayoutPage } from "./app/pages/layout/layout.page";
import { TransactionModel } from "./app/data/models/transaction.model";

class App {

    private readonly _layout: LayoutPage

    constructor() {
        this._layout = new LayoutPage();
        console.log(TransactionModel.handleResponse([
            {
                id: '1',
                isDebet: false,
                amount: 123.422,
                senderName: 'Петр',
                currency: 'RUB',
                description: 'Это тебе',
                docDate: new Date().getTime()
            },
            {
                id: '2',
                isDebet: true,
                amount: 0.32,
                senderName: 'Иван',
                currency: 'USD',
                description: 'Это тебе!',
                docDate:new Date().getTime()
            }
        ]))
    }

}

const app = new App();

