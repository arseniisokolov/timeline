import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

/** Асинхронный адаптер для LocalStorage браузера */
export class LocalStorageAdapter<T extends { id: string }> {

    public get(key: string): Observable<T[]> {
        return new Observable(subscriber => {
            subscriber.next(JSON.parse(localStorage.getItem(key)) || []);
        })
    }

    public post(key: string, items: T[]): Observable<void> {
        return this.get(key).pipe(
            first(),
            map(existItems => {
                localStorage.setItem(key, JSON.stringify([...existItems, ...items]))
            }, (error: any) => {
                console.error(error);
            })
        );
    }

    public delete(key: string, id: string): Observable<void> {
        return this.get(key).pipe(
            first(),
            map((items: T[]) => {
                localStorage.setItem(key, JSON.stringify((items.filter(i => i.id !== id))));
            }, (error: any) => {
                console.error(error);
            })
        );
    }


}

