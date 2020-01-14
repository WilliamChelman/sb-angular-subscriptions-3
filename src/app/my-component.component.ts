import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, mergeMap, map, reduce, tap } from 'rxjs/operators';
import { Cat, CatService } from './cat.service';

@Component({
  selector: 'my-component',
  templateUrl: './my-component.component.html'
})
export class MyComponent {
	cats$: Observable<CatContainer[]>;

	constructor(private catService: CatService){}

  ngOnInit(): void {
    this.cats$ = this.catService.getAll().pipe(
      tap(cats => console.log('getAll returns an array of cats', cats)),
      switchMap(cats => cats),
      tap(cat => console.log('Now operators are called on each cat', cat)),
      mergeMap(cat => this.catService.getSlaves(cat.id).pipe(map(slaves => ({cat, slaves: slaves.map(slave => slave.name).join(', ')})))),
      tap(catContainer => console.log('Hello container', catContainer)),
      reduce((acc, current) => [...acc, current], []),
      tap(allContainers => console.log('at the end, here are all the containers', allContainers))

    );
	}
}

interface CatContainer {
  cat: Cat;
  slaves: string;
}