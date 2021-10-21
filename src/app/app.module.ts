import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule} from '@ngrx/store-devtools';


import { AppRouting } from './app-routing.module';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AlertComponent } from './shared/alert/alert.component';


import { coreModule } from './core-module,module';

import { sharedModule } from './shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';
import { AuthReducer } from './auth/store/auth.reducer';
import { AppReducer } from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { placeholderDirective } from './shared/placeholder/placeholder.directive';
import { AuthModule } from './auth/auth.module';
import { environment } from 'src/environments/environment';
import { recipieEffects } from './recipies/store/recipies.effects';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,FormsModule,
    AppRouting,ReactiveFormsModule,HttpClientModule,
    coreModule,sharedModule,StoreModule.forRoot(AppReducer),AuthModule,
    EffectsModule.forRoot([AuthEffects,recipieEffects]),
    StoreDevtoolsModule.instrument({logOnly: environment.production})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
