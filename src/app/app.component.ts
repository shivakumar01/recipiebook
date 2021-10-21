import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromAPP from './store/app.reducer';
import * as fromAuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'project';
  feature: string = 'Recipie';
  
  featureSelected(feature: string){
    this.feature = feature;
    console.log('Im in '+feature);
  }

  constructor(private store: Store<fromAPP.AppState>){

  }

  ngOnInit(){
    console.log('inside the auto logo in')
    this.store.dispatch(new fromAuthActions.AutoLogin());
  }
}
