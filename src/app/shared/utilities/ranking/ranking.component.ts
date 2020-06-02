import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  @Input()
  ranking: number;

  get cubes(): number[] {
    return Array(Math.ceil(this.ranking)).fill(this.lastItemSize);
  }

  get lastItemSize(): number {
    return (this.ranking - Math.trunc(this.ranking)) * 100;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
