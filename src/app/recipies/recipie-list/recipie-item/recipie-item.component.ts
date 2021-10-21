import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipie } from '../../recipie.model';

@Component({
  selector: 'app-recipie-item',
  templateUrl: './recipie-item.component.html',
  styleUrls: ['./recipie-item.component.css']
})
export class RecipieItemComponent implements OnInit {
  @Input() id: Number;
  @Input() recipie: Recipie;
  @Output() OnRecipieSelected = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  recipieItemSelected(recipie){
    this.OnRecipieSelected.emit(recipie);
  }

}
