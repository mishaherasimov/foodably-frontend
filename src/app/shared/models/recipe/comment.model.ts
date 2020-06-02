//@ author: SNEHA JAYAVARDHINI
export class Comment {
  constructor(
    public comment: string,
    public userId: string,
    public user: { name: string },
    public createdAt: Date,
    public like: number,
    public id?: string) {}
}
