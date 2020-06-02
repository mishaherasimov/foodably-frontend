//Author: Ujwal Vikas Chanda, uj225642@dal.ca

import { Component, Input, OnInit, } from '@angular/core';
import { RecipeItem } from '../shared/models/recipe-item.model';
import { AdvSearchComponent } from '../shared/forms/adv-search/adv-search.component';
import {MatDialog} from '@angular/material/dialog';
import { RecipeSearch } from '../shared/models/recipe-search.model';
import {SearchService} from '../shared/services/search/search.service'
import {Router} from '@angular/router';
import {SearchApiService} from '../shared/services/search/search-api.service'
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { localizedString } from '@angular/compiler/src/output/output_ast';
import {FilterData} from '../shared/forms/adv-search/filter.model';
import { RecipeItems } from './search-recipe.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  isAdvSearchOpen = false;
  searchKey:any
  searchKeyA:any
  @Input()
  recipeSections = [{
    recipes: []
  }];
  /*variables declaration*/
  router:Router
  data:any
  dataAgain:any
  searchAgain:any
  recipeItem: RecipeSearch[]
  recipeID:any
  noOfItems:Number
sortRating="ranking"
sortDate="createdAt"
sortTime="preparationTime"
sortLikes="likes"
sortedBy="Choose"
filter:FilterData

 constructor( public dialog: MatDialog,public search: SearchService, _search: SearchApiService, _router: Router) {
  this.router=_router
  this.searchKey = search.getSearchKey()
  console.log(this.searchKey)
  this.searchAgain = _search
console.log(search.getFilterKey())
  this.searchAgain.getAllRecipes(this.searchKey).subscribe(res => {
    this.onGetData(res)
     })

  }

  ngOnInit() {
    //if(location.pathname != "/"){location.replace("/")}
  }

//Search method called after clicked on search
  onSearch(){
    this.recipeSections[0]["recipes"]=[]
    console.log(this.searchKey)
    this.search.putSearchKey(this.searchKey)
    if(!this.searchKey){
      alert("Please Search Something")
    }else{

      this.searchAgain.getAllRecipes(this.searchKey).subscribe(res => {
        this.onGetData(res)
      })

    }
  }

//Method to get data from api service file
  onGetData(data){
    this.recipeSections[0]["recipes"]=[]
    for (var index in data){
      console.log(data[index])
      this.searchAgain.getAuthor(data[index].author).subscribe(res => {
        console.log(res[0].name)
        this.recipeSections[0]["recipes"].push(new RecipeItems(data[index].previewURL,data[index].preparationTime+" min",data[index].title,res[0].name,data[index].id,data[index].author))

      })
     }
     this.noOfItems=this.recipeSections[0]["recipes"].length
     console.log(this.noOfItems)
  }

//Opens advance search component
  onAdvSearch(){
    if(!this.searchKey){
      alert("Please Search Something")
    }else{
      this.search.putSearchKey(this.searchKey)
      const dialogRef = this.dialog.open(AdvSearchComponent, {
        width: '250px',
        height: '250px',
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The advance search was closed');
        this.searchAgain.getFilteredRecipes(this.searchKey,this.search.getFilterData()).subscribe(res => {
          this.onGetData(res)
           })
      });
    }
  }

//Sort component
  onSort(order){
    this.sortedBy=order
    if(!this.searchKey){
      alert("Please Search Something")
    }else{

      this.searchAgain.getSortedRecipes(this.searchKey,order).subscribe(res => {
        this.onGetData(res)
      })
    }
  }

  onClickRecipe(id){
    console.log(id)
    this.router.navigateByUrl("/recipes/"+id)
  }

  onClickAuthor(id){
    console.log(id)
  }

}
