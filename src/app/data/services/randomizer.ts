import { TimelineDocTypes } from "../base/timeline-doc-types.enum";
import { Observable, of } from "rxjs";
import { ITransaction } from "../models/transaction.model";
import { INewsItem } from "../models/news-item.model";
import { ITimelineEvent } from "../base/timeline-event.model";
import * as Helpers from "../base/helpers";

export class Randomizer {

    public getRandomData(docType: TimelineDocTypes): Observable<ITimelineEvent> {
        let item: ITimelineEvent;
        switch (docType) {
            case TimelineDocTypes.Transaction: item = this.getRandomTransaction(); break;
            case TimelineDocTypes.News: item = this.getRandomNews(); break;
        };
        return of(item);
    }

    private getRandomTransaction(): ITransaction {
        const isTurgenev = Helpers.checkPropability(0.3);
        return {
            id: Helpers.getGuid(),
            isDebet: Helpers.checkPropability(0.3),
            amount: Helpers.getRandomInt(0.01, 12300000.23),
            senderName: isTurgenev ? 'Тургенев Иван Сергеевич' : 'Гончаров Иван Александрович',
            currency: Helpers.checkPropability(0.3) ? (Helpers.checkPropability(0.3) ? 'RUB' : 'EUR') : (Helpers.checkPropability(0.3) ? 'USD' : 'RUR'),
            description: isTurgenev ? 'Деньги я отправил тебе за твою недавнюю услугу. Прочти еще мои последние наброски:<br>Одинцова была немного старше Аркадия, ей пошел двадцать девятый год, но в ее присутствии он чувствовал себя школьником, студентиком, точно разница лет между ними была гораздо значительнее. Матвей Ильич приблизился к ней с величественным видом и подобострастными речами. Аркадий отошел в сторону, но продолжал наблюдать за нею: он не спускал с нее глаз и во время кадрили. Она также непринужденно разговаривала с своим танцором, как и с сановником, тихо поводила головой и глазами и раза два тихо засмеялась. Нос у ней был немного толст, как почти у всех русских, и цвет кожи не был совершенно чист; со всем тем Аркадий решил, что он еще никогда не встречал такой прелестной женщины. Звук ее голоса не выходил у него из ушей; самые складки ее платья, казалось, ложились у ней иначе, чем у других, стройнее и шире, и движения ее были особенно плавны и естественны в одно и то же время.' : 'Деньги я отправил тебе за твою недавнюю услугу. Прочти еще мои последние наброски:<br>Обломов хотя и прожил молодость в кругу всезнающей, давно решившей все жизненные вопросы, ни во что не верующей и все холодно, мудро анализирующей молодежи, но в душе у него теплилась вера в дружбу, в любовь, в людскую честь, и сколько ни ошибался он в людях, сколько бы ни ошибся еще, страдало его сердце, но ни разу не пошатнулось основание добра и веры в него. Он втайне поклонялся чистоте женщины, признавал ее власть и права и приносил ей жертвы.',
            docDate: new Date().getTime()
        }
    }
    private getRandomNews(): INewsItem {
        return {
            id: Helpers.getGuid(),
            extract: `Персональное предложение: оформите депозит по ставке ${Helpers.getRandomInt(2.5, 6.5).toFixed(1)}%`,
            isVisited: false,
            description: 'По временным рамкам вклады могут быть краткосрочные и долгосрочные, с возможностью пополнения и снятия денег со вклада и без таковой. От таких условий вклада (срок и возможность проведения операций по вкладу после его открытия), а также от размера суммы вклада зависит его процентная ставка – те деньги, которые банк заплатит, если вкладчик будет соблюдать все условия вклад.',
            docDate: new Date().getTime()
        }
    }

}