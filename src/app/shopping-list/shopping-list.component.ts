import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/models/recipe/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  lat = '';//number = 44.6344
  lng = '';//number = -63.5822

  shoppingListSub: Subscription;
  shoppingList: Array<Ingredient>;
  error: null;

  location: Object;
  // public shoppingList = [
  //   {name:"Chicken",qty:"500gm"},
  //   {name:"Oil",qty:"100ml"},
  //   {name:"Chillies",qty:"10g"}
  // ];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.getShoppingList();
  }

  ngOnDestroy(): void {
    this.shoppingListSub.unsubscribe();
  }

  // console.log("users array1", this.cookinglist);
  // this.map.getlocation().subscribe(data => {
  //   console.log(data);
  //   this.lat = data.latitude;
  //   this.lng=data.longitude;
  // })

  getShoppingList() {
    this.shoppingListSub = this.shoppingListService.fetchUserCookingList().subscribe(
      shoppingList => {
        this.shoppingList = shoppingList;
      },
      error => {
        this.error = error.message;
      }
    );
  }
}
