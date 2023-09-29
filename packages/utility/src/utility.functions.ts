import { filter, type Observable, type Subject, take } from 'rxjs';

export function getRandomInteger(min: number, max: number): number {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
}

export async function resolveObservable<T>(subject: Subject<T> | Observable<T>): Promise<T> {
  return new Promise((resolve) => {
    subject
      .pipe(
        filter((baseUrl) => !!baseUrl),
        take(1),
      )
      .subscribe(resolve);
  });
}
