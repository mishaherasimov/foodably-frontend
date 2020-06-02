//@author : SNEHA JAYAVARDHINI
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {RatingService} from './rating.service';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() rating: number;
  @Input() itemId: number;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();
  count = 0;

  constructor(private ratingService: RatingService) {}
  inputName: string;
  ngOnInit() {
    this.inputName = this.itemId + '_rating';
  }
  // calls the onRate() of Rating service
  onClick(starrating: number): void {
    this.count = this.count + 1;
    this.rating = starrating;
    console.log(this.rating)
    this.ratingClick.emit({
      itemId: this.itemId,
      rating: starrating
    });
    if (this.count === 1) {
      console.log('post' + this.count);
      this.ratingService.onRate(this.rating);
    } else {
      console.log('update' + this.count);
      this.ratingService.onRateUpdate(this.rating)
        .subscribe(
          responseData => {
            console.log('Update Success');
          });
    }

  }
}
