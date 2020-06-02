//Author: Ujwal Vikas Chanda, uj225642@dal.ca
import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SearchComponent } from 'src/app/search/search.component';
import {Router} from '@angular/router';
import {FilterData} from './filter.model';
import {SearchService} from '../../../shared/services/search/search.service'
import {SearchApiService} from '../../../shared/services/search/search-api.service'

@Component({
  selector: 'app-adv-search',
  templateUrl: './adv-search.component.html',
  styleUrls: ['./adv-search.component.scss']
})
export class AdvSearchComponent implements OnInit {

searchKey:any

  constructor(public dialog: MatDialog,public search: SearchService, _search: SearchApiService, public dialogRef: MatDialogRef<SearchComponent>) {
    // Get Search key word on loading advace search component
    this.searchKey = this.search.getSearchKey()

  }

  ngOnInit() {
  }

// On closing advance search
  onClose() {
    this.search.unsetFilterKey()
   this.dialogRef.close();
  }

  public showup: boolean = false;
  public showupA: boolean = false;
  public showupC: boolean = false;
  public showupD: boolean = false;
  type: boolean = false;
  diet: boolean = false;
  ingr: boolean = false;
  cusine: boolean = false;
  types = ["Breakfast","Lunch","Dinner","Snacks"]
  diets = ["true","false"]
  ingrs=["Pork","Chicken","Beef","Honey","Lime","Oats"]
  cusines=["Chinese cuisine","Italian cuisine","Indian cuisine","Continental cuisine"]
  typesAgain = []
  dietsAgain = []
  ingrsAgain=[]
  cusinesAgain=[]
  filter:FilterData

//Swithcing between filters
  onFilter() {
    this.showup = !this.showup;
    this.showupA = false;
    this.showupC = false;
    this.showupD = false;
    this.type = !this.type;
    this.diet = false;
    this.ingr = false;
    this.cusine = false;
  }

  onFilterA() {
    this.showup = false;
    this.showupA = !this.showupA;
    this.showupC = false;
    this.showupD = false;
    this.type = false;
    this.diet = !this.diet;
    this.ingr = false;
    this.cusine = false;
  }


  onFilterC() {
    this.showup = false;
    this.showupA = false;
    this.showupC = !this.showupC;
    this.showupD = false;
    this.type = false;
    this.diet = false;
    this.ingr = !this.ingr;
    this.cusine = false;
  }

  onFilterD() {
    this.showup = false;
    this.showupA = false;
    this.showupC = false;
    this.showupD = !this.showupD;
    this.type = false;
    this.diet = false;
    this.ingr = false;
    this.cusine = !this.cusine;
  }

  onSelect(value){

    if(this.type){
      if(this.typesAgain.indexOf(value) > -1){
        const index = this.typesAgain.indexOf(value)
        this.typesAgain.splice(index,1)
        console.log("removed item")
        console.log(this.typesAgain)
      }
      else{
        this.typesAgain.push(value)
        console.log("added item")
        console.log(this.typesAgain)
      }
    }

    if(this.diet){
      if(this.dietsAgain.indexOf(value) > -1){
        const index = this.dietsAgain.indexOf(value)
        this.dietsAgain.splice(index,1)
        console.log("removed item")
        console.log(this.dietsAgain)
      }
      else{
        this.dietsAgain.push(value)
        console.log("added item")
        console.log(this.dietsAgain)
      }
    }

    if(this.ingr){
      if(this.ingrsAgain.indexOf(value) > -1){
        const index = this.ingrsAgain.indexOf(value)
        this.ingrsAgain.splice(index,1)
        console.log("removed item")
        console.log(this.ingrsAgain)
      }
      else{
        this.ingrsAgain.push(value)
        console.log("added item")
        console.log(this.ingrsAgain)
      }
    }

    if(this.cusine){
      if(this.cusinesAgain.indexOf(value) > -1){
        const index = this.cusinesAgain.indexOf(value)
        this.cusinesAgain.splice(index,1)
        console.log("removed item")
        console.log(this.cusinesAgain)
      }
      else{
        this.cusinesAgain.push(value)
        console.log("added item")
        console.log(this.cusinesAgain)
      }
    }
  }


//To clear filters
  onClear(){
    this.search.unsetFilterKey()
    this.dialogRef.close()
    this.dialog.open(AdvSearchComponent, {
      width: '250px',
      height: '250px',
    });
  }

//To submit applied filters
  onSubmit(){

    if(this.typesAgain.length == 0){
      this.typesAgain = this.types
    }
    if(this.dietsAgain.length == 0){
      this.dietsAgain = this.diets
    }
    if(this.cusinesAgain.length == 0){
      this.cusinesAgain = this.cusines
    }

    this.filter = {
      ingredients: this.ingrsAgain,
      type: this.typesAgain,
      isVeg: this.dietsAgain,
      cuisine: this.cusinesAgain
    }

    if(!this.searchKey){
      alert("Please Search Something")
    }else{
      this.search.setFilterKey()
      this.search.putFilterData(this.filter)
      this.dialogRef.close()


    }
  }

}
