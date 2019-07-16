import { ReplaySubject } from 'rxjs';

export class SubscriptionsKiller {

    public Unsubscriber = new ReplaySubject<void>(1);

    public killAllSubscriptions() {
        this.Unsubscriber.next();
        this.Unsubscriber.complete();
        this.Unsubscriber.unsubscribe();
        this.Unsubscriber = null;
    }

}