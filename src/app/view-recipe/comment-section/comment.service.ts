// @author: SNEHA JAYAVARDHINI
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
// import {Comment} from './comment.model';
import {Comment} from '../../shared/models/recipe/comment.model';
import {NgForm} from '@angular/forms';
import {catchError, map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {AuthService} from '../../shared/auth.service';
import {Recipe} from '../../shared/models/recipe/recipe.model';

@Injectable({ providedIn: 'root' })
export class CommentService {

    baseURL = 'http://localhost:4000/';

    commentDesc: string;
    recipeId: string;
    userId: string;
    user: string;
    id: string;
    // comment: string;

    constructor(private http: HttpClient, private authService: AuthService) {}
    
    // gets the comments from the backend using GET request
    getComments() {
      return this.http
        .get(this.baseURL + 'userComments/allComments/' + this.recipeId)
        .pipe(
          map(responseData => {
              return plainToClass(Comment, responseData);
          }),
          catchError(errorRes => {
            return throwError(errorRes);
          })
        );
    }
    
    // takes the form sent by user as a parameter and sends th POST requst to store the comment
    
    onComment(form: NgForm) {

      this.commentDesc = form.value.comment;
      this.userId = this.authService.userId;
      console.log(form.value);
      console.log('commentDesc' + this.commentDesc);

      const commentData = {
        comment: this.commentDesc,
        recipeId: this.recipeId,
        userId : this.userId,
        like: 0
      };

      return this.http.post<Comment>(this.baseURL + `userComments/comment`,
        commentData, {
        headers: new  HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
        map((responseData) => {
          form.reset();
          const key = 'message';
          if (responseData.hasOwnProperty(key)) {
            return plainToClass(Comment, responseData[key]);
          }
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
    }
    // this method deletes the comment
    onDelete(commentId): Observable<any> {
      return this.http.delete(this.baseURL + `userComments/delete/` + commentId);
    }
    // updates the like and comment 
    onUpdate(updateid, updatecomment, likecount) {
      const data = {
        id: updateid,
        comment: updatecomment,
        like: likecount + 1
      };
      console.log(data);
      return this.http.put(this.baseURL + 'userComments/update', data);
    }
}
