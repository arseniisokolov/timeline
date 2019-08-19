import { TimelineEntryTypes } from "../base/timeline-entry-types.enum";
import { Observable, of } from "rxjs";
import { ITransaction } from "../models/transaction-entry.model";
import { INewsItem } from "../models/news-entry.model";
import { ITimelineShowable } from "../base/timeline-entry.model";
import { Helpers } from "../../../core-library/core/classes/helpers";

/** Генератор случайных записей */
export class Randomizer {

    public getRandomData(docType: TimelineEntryTypes): Observable<ITimelineShowable> {
        let item: ITimelineShowable;
        switch (docType) {
            case TimelineEntryTypes.Transaction: item = this.getRandomTransaction(); break;
            case TimelineEntryTypes.News: item = this.getRandomNews(); break;
        };
        return of(item);
    }

    private getRandomTransaction(): ITransaction {
        const isTurgenev = Helpers.checkPropability(0.3);
        const isDebet = Helpers.checkPropability(0.6);
        return {
            id: Helpers.getGuid(),
            isDebet,
            amount: Helpers.getRandomInt(0.01, 12300000.23),
            senderName: isTurgenev ? 'Тургенев Иван Сергеевич' : 'Гончаров Иван Александрович',
            currency: Helpers.checkPropability(0.3) ? (Helpers.checkPropability(0.3) ? 'RUB' : 'EUR') : (Helpers.checkPropability(0.3) ? 'USD' : 'RUR'),
            description: isDebet ? 'Гонорар за последние 3 главы вашего нового романа' : 'Предоплата за организацию автограф-сессии',
            docDate: new Date().getTime()
        }
    }
    private getRandomNews(): INewsItem {
        const isDeposit = Helpers.checkPropability(0.5);
        const rate = isDeposit ? Helpers.getRandomInt(2.5, 6.5).toFixed(1) : Helpers.getRandomInt(9.5, 18.5).toFixed(1);
        return {
            id: Helpers.getGuid(),
            extract: `Персональное предложение: оформите ${isDeposit ? 'депозит' : 'кредит'} по ставке ${rate}%`,
            isVisited: false,
            description: isDeposit ? 'По временным рамкам вклады могут быть краткосрочные и долгосрочные, с возможностью пополнения и снятия денег со вклада и без таковой. От таких условий вклада (срок и возможность проведения операций по вкладу после его открытия), а также от размера суммы вклада зависит его процентная ставка – те деньги, которые банк заплатит, если вкладчик будет соблюдать все условия вклад.' : 'Погашайте другие кредиты - используйте средства карты Mastercard, чтобы погасить кредит в любом другом банке на льготных условиях: комиссия 0% за перевод задолженности и 120 дней не нужно платить проценты за кредит.',
            docDate: new Date().getTime()
        }
    }

}