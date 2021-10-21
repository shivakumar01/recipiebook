import { Component, OnInit, Input } from '@angular/core';
import { RecipieService } from './recipie.service';
import { Recipie } from './recipie.model';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrls: ['./recipies.component.css'],

})
export class RecipiesComponent implements OnInit {
  @Input() id: Number;
  constructor(private recipieService: RecipieService) { }

  ngOnInit(): void {
  }

  

}
