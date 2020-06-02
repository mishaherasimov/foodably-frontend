//Author: Ujwal Vikas Chanda, uj225642@dal.ca
//Recipe Item Model
export class RecipeItems {

  constructor(public imagePath: string,
              public duration: string,
              public name: string,
              public author: string,
              public id:string,
              public authorID: string) {
  }
}
