import { Component, OnInit, Input } from '@angular/core';
import { RecipieService } from '../recipie.service';
import { Ingridient } from 'src/app/shared/ingridient.model';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import * as fromRecipieActions from '../store/recipies.actions';

@Component({
  selector: 'app-recipie-detail',
  templateUrl: './recipie-detail.component.html',
  styleUrls: ['./recipie-detail.component.css']
})
export class RecipieDetailComponent implements OnInit {
  recipie;
  id:number;
  constructor(private recipieService: RecipieService,private route: ActivatedRoute,private router:Router,private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
    this.route.params.pipe(map(params => {
      this.id = +params['id'];
      return +params['id'];
    }),switchMap(id => {
      console.log('params id is '+ id);
        return this.store.select('recipies').pipe(map(recipieState => {
          return recipieState.recipies.find((recipie,index)=>{
            return index === id;
          })
        }))
    })).subscribe(Recipie => {
      console.log('recipie is');
      console.log(Recipie);
      this.recipie = Recipie;
    });
  }

  sendToShoppingList(){
    this.recipieService.sendToShoppingList(this.recipie.ingridients);
  }

  deleteRecipie(){
    // this.recipieService.deleteRecipie(this.id);
    this.store.dispatch(new fromRecipieActions.deleteRecipie(this.id));
    this.router.navigate(['../'],{relativeTo:  this.route});
  }

}
