import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {Recipie} from '../recipie.model';
import { RecipieService } from '../recipie.service';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipie-list',
  templateUrl: './recipie-list.component.html',
  styleUrls: ['./recipie-list.component.css']
})
export class RecipieListComponent implements OnInit {

  Recipies: Recipie[] = [];

  constructor(private recipieService: RecipieService,private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    console.log('inside recipie list component activation');
    // this.Recipies = this.recipieService.getRecipies();
    this.store.select('recipies').subscribe(Recipies => {
      console.log('inside recipies list');
      if(Recipies){
     this.Recipies = Recipies.recipies;
      }
      console.log('after recipies');
      // if(recipies.recipies){
      // this.Recipies = recipies.recipies;
      // }
    })


    // pipe(map(recipieState => recipieState.recipies)).subscribe((recipies: Recipie[])=>{
    //   console.log('inside recipie list ');
    //   console.log(recipies);
    //   this.Recipies = recipies;
    // });

  }


}
