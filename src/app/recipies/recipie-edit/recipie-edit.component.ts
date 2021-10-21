import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipieService } from '../recipie.service';
import { Recipie } from '../recipie.model';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import { map } from 'rxjs/operators';
import * as fromRecipieActions from '../store/recipies.actions';

@Component({
  selector: 'app-recipie-edit',
  templateUrl: './recipie-edit.component.html',
  styleUrls: ['./recipie-edit.component.css']
})
export class RecipieEditComponent implements OnInit {
 id:number;
 editFlag:boolean = false;
 form:FormGroup;
 recipie:Recipie;
 ingridients = new FormArray([]);


  constructor(private route:ActivatedRoute,private RecipieService: RecipieService,
    private router: Router,private store: Store<fromApp.AppState>) { }



  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
        this.id = +params['id'];
        this.editFlag = this.id!=null;
        console.log(this.editFlag);
        this.initForm();

      }
    )
  }

  private initForm(){
    let recipieName = '';
    let imagePath = '';
    let description = '';
    let ingridients;

    if(this.editFlag){
      // this.recipie = this.RecipieService.getRecipie(this.id);

      this.store.select('recipies').pipe(map(recipieState => {
        console.log(recipieState.recipies);
          return recipieState.recipies.find((recipie,index)=>{
              return this.id === index;
          })
      })).subscribe(R => {
        this.recipie = R;
        recipieName = this.recipie.name;
        imagePath = this.recipie.imagePath;
        description = this.recipie.description;
  
        if(this.recipie.ingridients){
        for(let ingridient of this.recipie.ingridients){
        ingridients = this.ingridients.push(
          new FormGroup({
            'name' : new FormControl(ingridient.name,Validators.required),
            'amount': new FormControl(ingridient.amount,[Validators.required,Validators.pattern(/[0-9]*/)])
          })
        );
        }
      }
      });

      
    }

    this.form = new FormGroup({
      'name': new FormControl(recipieName,Validators.required),
      'imagePath' : new FormControl(imagePath,Validators.required),
      'description': new FormControl(description,[Validators.required,Validators.pattern(/[0-9]*/)]),
      'ingridients': this.ingridients

    });
  }

  getIngridients(){
    return (<FormArray>(this.form.get('ingridients'))).controls;
  }

  onAddIngridient(){
    this.ingridients.push(new FormGroup({
      'name': new FormControl(null,Validators.required),
      'amount' : new FormControl(null,[Validators.required,Validators.pattern(/[0-9]*/)])
    }));
  }

  onSubmit(){
    if(this.editFlag){
      // this.RecipieService.updateRecipie(this.id,this.form.value);
      this.store.dispatch(new fromRecipieActions.updateRecipie({
        index: this.id,
        recipie: this.form.value}));
    }else{
      this.store.dispatch(new fromRecipieActions.addRecipie(this.form.value));
    }
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo: this.route});
  }

  onDeleteIngridient(id:number){
    this.ingridients.removeAt(id);
  }

}
