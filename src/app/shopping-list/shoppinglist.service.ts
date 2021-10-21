import { Ingridient } from '../shared/ingridient.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class shoppingListService
{
    ingridientsChange = new Subject<Ingridient[]>();
    editSelected = new Subject<number>();
    private ingridients: Ingridient[] = [
        new Ingridient('Apples',5),
        new Ingridient('Tomatoes',10)
      ];

      getIngridients(){
          return this.ingridients.slice();
      }

      getIngridient(index: number){

            return this.ingridients[index];

      }

      setIngridient(index:number,ingridient:Ingridient){
          console.log(ingridient);
          this.ingridients[index] = ingridient;
          console.log(this.ingridients);
          this.ingridientsChange.next(this.ingridients);
      }

    addIngridient(ingridient: Ingridient){
        this.ingridients.push(ingridient);
        this.ingridientsChange.next(this.ingridients);
    }

    addIngridients(ingridient: Ingridient[]){
        console.log('adding..');
        this.ingridients.push(...ingridient);
        this.ingridientsChange.next(this.ingridients);
    }

    deleteIngridient(index: number){
        this.ingridients.splice(index,1);
        this.ingridientsChange.next(this.ingridients);
    }

    


}