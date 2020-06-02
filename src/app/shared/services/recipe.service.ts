import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map } from 'rxjs/operators';
import {throwError} from 'rxjs';
import { plainToClass } from 'class-transformer';
import {Recipe} from '../models/recipe/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  baseURL = 'http://localhost:4000/';

  constructor(private http: HttpClient) {}

  fetchRecipes() {
    return this.http
      .get(this.baseURL + 'recipe/all')
      .pipe(
        map(responseData => {
          const key = 'data';
          if (responseData.hasOwnProperty(key)) {
            return plainToClass(Recipe, responseData[key]) as unknown as Array<Recipe>;
          }
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  fetchRecipe(id: string) {
    return this.http
      .get(this.baseURL + 'recipe/' + id)
      .pipe(
        map(responseData => {
          const key = 'data';
          if (responseData.hasOwnProperty(key)) {
            return plainToClass(Recipe, responseData[key]);
          }
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  createRecipe(recipe: Recipe) {

    // enter units for preselected items in steps
    const ingredients = recipe.ingredients;
    recipe.instruction.forEach(item => {
      item.ingredients.forEach(ing => {
        const ingredient = ingredients.find(x => x.name === ing.name);
        ing.units = ingredient.units;
      });
    });

    return this.http
      .post(`${this.baseURL}recipe/`,
        JSON.stringify(recipe),
        {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      })
      .pipe(
        map((responseData) => {
          const key = 'data.id';
          if (responseData.hasOwnProperty(key)) {
            return plainToClass(Recipe, responseData[key]);
          }
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  fetchUserRecipes() {
    return this.http
      .get(this.baseURL + 'profile/recipes/' + sessionStorage.getItem('id'))
      .pipe(
        map(responseData => {
          const key = 'data';
          if (responseData.hasOwnProperty(key)) {
            return plainToClass(Recipe, responseData[key]) as unknown as Array<Recipe>;
          }
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  deleteRecipe(id: string) {
    return this.http
      .delete(this.baseURL + 'recipe/' + id)
      .pipe(
        map(responseData => {
          return true;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  subscribeRecipe(subscriberId :String,subscriberdTo:String){
    return this.http.post(this.baseURL+'recipe/subscribe/'+subscriberId+'/'+subscriberdTo,null);
  }

  unSubscribeUser(subscriberId :String,subscriberdTo:String){
    return this.http.post(this.baseURL+'recipe/unsubscribe/'+subscriberId+'/'+subscriberdTo,null);
  }

  createCookingList(id:String,ingredients:any){

    return this.http.post(this.baseURL+'cookinglist/'+id+'/',ingredients);

  }

}
