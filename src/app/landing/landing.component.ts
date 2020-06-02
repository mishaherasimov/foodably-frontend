import { Component, Input, OnInit } from '@angular/core';
import { RecipeItem } from '../shared/models/recipe-item.model';
import { BlogItem } from "../shared/models/blog-item.model";
import { SearchService } from '../shared/services/search/search.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  @Input()
  recipeSections = [{
      header: 'Most popular today',
      recipes: [
        new RecipeItem('assets/img/stock-img/eiliv-sonas-aceron-FoHTUTU8SzE-unsplash.jpg', '40 min', 'Petit beurre dessert',  'Seth Carson'),
        new RecipeItem('assets/img/stock-img/baiq-daling-ykThMylLsbY-unsplash.jpg', '30 min', 'Eggs en Cocotte', 'Alice Norris'),
        new RecipeItem('assets/img/stock-img/aigars-peda-HEG9RhlLKTY-unsplash.jpg', '15 min', 'Salmon rice soup with ginger and garlic', 'Eunice Bush'),
        new RecipeItem('assets/img/stock-img/martin-widenka-tkfRSPt-jdk-unsplash.jpg', '20 min', 'Petit beurre dessert', 'Randall Fisher')
      ]
    },
    {
      header: 'Best recipes at this time of the day',
      recipes: [
        new RecipeItem('assets/img/stock-img/eiliv-sonas-aceron-FoHTUTU8SzE-unsplash.jpg', '40 min', 'Petit beurre dessert',  'Seth Carson'),
        new RecipeItem('assets/img/stock-img/baiq-daling-ykThMylLsbY-unsplash.jpg', '30 min', 'Eggs en Cocotte', 'Alice Norris'),
        new RecipeItem('assets/img/stock-img/aigars-peda-HEG9RhlLKTY-unsplash.jpg', '15 min', 'Salmon rice soup with ginger and garlic', 'Eunice Bush'),
        new RecipeItem('assets/img/stock-img/martin-widenka-tkfRSPt-jdk-unsplash.jpg', '20 min', 'Petit beurre dessert', 'Randall Fisher')
      ]
    }
  ];

  blogSection = {
    header: 'Latest articles that might inspire you',
    blogs: [
      new BlogItem('',
                        'The Perfect Holiday Cookie, Based on Your Zodiac Sign',
                      'Trevor Parker',
                     'Just in case you haven’t noticed already, we’ve launched a new feature that enables all of our community members to upload their own recipes through Kitchen Stories’ app! Ever since the launch, we’ve been marveling at the creativity and diversity of these brilliant recipes, from sesame chicken, lentil …', 0),
      new BlogItem('',
                        'Everything You Need to Know About Preparing and Storing In Season',
                      'Martha Dixon',
                     'I guess you could say my childhood was strewn together with beautifully slivered oranges. Whether it was a birthday, wedding, Chinese New Year, or simply a fresh dessert on a weeknight, there was never an inappropriate time for my grandma to present bouquet of orange slices. Its favored place in ...', 0),
      new BlogItem('',
                        'Beat the Blues with This Winter Salad with Summery Hues',
                      'Jeffery Neal',
                     'Just in case you haven’t noticed already, we’ve launched a new feature that enables all of our community members to upload their own recipes through Kitchen Stories’ app! Ever since the launch, we’ve been marveling at the creativity and diversity of these brilliant recipes, from sesame chicken, lentil …', 0),
      new BlogItem('',
                        'Everything You Need to Know About Preparing and Storing In Season Oranges',
                      'Edna Schwartz',
                     'I guess you could say my childhood was strewn together with beautifully slivered oranges. Whether it was a birthday, wedding, Chinese New Year, or simply a fresh dessert on a weeknight, there was never an inappropriate time for my grandma to present a bouquet of orange slices. Its favored place in ...',0)
    ]
  };

  searchKey=""
search: SearchService
router:any
  //constructor( private dialog: MatDialog) {
    constructor(private _search:SearchService, private _router:Router) {
this.search = _search
this.router=_router
  }


  ngOnInit() {
  }

  onSearch(){

    this.search.putSearchKey(this.searchKey)
    if(!this.searchKey){
      alert("Please Search Something")
    }else{
      this.router.navigateByUrl('/search');
    }

  }
}
