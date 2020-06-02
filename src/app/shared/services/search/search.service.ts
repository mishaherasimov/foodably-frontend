//Author: Ujwal Vikas Chanda, uj225642@dal.ca
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {FilterData} from '../../forms/adv-search/filter.model';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

//Variables
  searchKey:any
  filterKey:Boolean
  filter:FilterData

constructor(){

}

//search key adapters
  putSearchKey(searchKey){
    this.searchKey = searchKey
  }
  getSearchKey(){
    return this.searchKey
  }

  //Filter key adapters
  setFilterKey(){
    this.filterKey = true
  }
  unsetFilterKey(){
    this.filterKey = false
  }
  getFilterKey(){
    return this.filterKey
  }

  putFilterData(data){
    this.filter = data

  }
  getFilterData(){
    return this.filter
  }


}
