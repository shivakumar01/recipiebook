import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService,AuthResponse } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { placeholderDirective } from '../shared/placeholder/placeholder.directive';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as fromAuthActions from './store/auth.actions';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy {

  constructor(private authService: AuthService,private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store:Store<fromApp.AppState>) { }

  isLoginMode:boolean = true;
  isLoading:boolean = false;
  error:string = null;
  authObs: Observable<AuthResponse>;
  isAutheticated:boolean = false;
  @ViewChild(placeholderDirective) viewRefD:placeholderDirective;
  closeSub:Subscription;
  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
      console.log('state change');
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if(this.error){
      this.onError(this.error);
      }
    });
  }

  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode;
  }

  onSubmit(form: NgForm){

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
  
    if(this.isLoginMode){

      // this.authObs = this.authService.login(email,password);
      this.store.dispatch(new fromAuthActions.LoginStart({email,password}));
      console.log('sign in');

    }else{
      
      this.store.dispatch(new fromAuthActions.SignupStart({email,password}));
    }

    // this.authObs.subscribe(
    //   resData => {
    //     this.isLoading = false;
    //     this.router.navigate(['/']);
    //   },
    //   errorMessage => {
    //     console.log(errorMessage);
    //     this.isLoading = false;
    //     this.onError(errorMessage);
    //     this.error = errorMessage;
    //   }
    // );

    form.reset();
  }

  // onHandleError(){
  //   this.error = null;
  // }

  onError(message: string){

    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    console.log(this.viewRefD);
    const viewRef = this.viewRefD.viewContainerRef;
    viewRef.clear();

    const alertComponentRef = viewRef.createComponent(alertComponentFactory);

    alertComponentRef.instance.message = message;
    this.closeSub = alertComponentRef.instance.close.subscribe(()=>{
      this.store.dispatch(new fromAuthActions.clearError());
      this.closeSub.unsubscribe();
      viewRef.clear();
    });

  }

  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }
  

}
