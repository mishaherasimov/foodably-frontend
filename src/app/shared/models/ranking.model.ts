
export class Ranking {

  get value(): number {
    if (this.total > 0) {
      const value = this.total / this.submissions;
      return parseFloat((value).toFixed(1));
    } else {
      return 0;
    }
  }

  constructor(public total: number, public submissions: number) {
  }
}
