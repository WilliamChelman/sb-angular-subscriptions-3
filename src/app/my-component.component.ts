import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {Cat, CatService} from './cat.service';

@Component({
  selector: 'my-component',
  templateUrl: './my-component.component.html'
})
export class MyComponent {
	cats$: Observable<Cat[]>;
  slavesPerCat: {[catId: string]: string} = {};

	constructor(private catService: CatService){}

  ngOnInit(): void {
    this.cats$ = this.catService.getAll().pipe(tap(cats => {
			cats.forEach(cat => {
				this.catService.getSlaves(cat.id).subscribe(slaves => {
					this.slavesPerCat[cat.id] = slaves.map(slave => slave.name).join(', ');
				});
			})
		}));
	}
}