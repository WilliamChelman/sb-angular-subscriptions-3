import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CatService {
  getAll(): Observable<Cat[]> {
    return of(cats);
  }

  getSlaves(catId: string): Observable<Person[]> {
    return of(slaves);
  }
}

const cats: Cat[] = [
  {
    id: '1',
    name: 'Scruffy 2000'
  },
  {
    id: '2',
    name: 'Captain Mc Fluffy Paw'
  }
];

const slaves: Person[] = [
  {
    id: '1',
    name: 'Thrall'
  },
  {
    id: '2',
    name: 'Jacques'
  }
];

export interface Cat {
  id: string;
  name: string;
}

export interface Person {
  id: string;
  name: string;
}