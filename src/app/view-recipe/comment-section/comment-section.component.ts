// @author: SNEHA JAYAVARDHINI
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {CommentService} from './comment.service';
import {Comment} from '../../shared/models/recipe/comment.model';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {
  comments: Comment;
  commentDesc = '';
  constructor(private commentService: CommentService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log('param id is' + params.id);
      this.commentService.recipeId = params.id;
    });

    this.onLoadComments();
  }
  // function to send the comment given by the user to the server, the form is sent as a parameter
  // to the onComment() of Comment Service 
  
  onComment(form: NgForm) {
    this.commentService.onComment(form).subscribe(() => {
      this.ngOnInit();
    });
  }
  
  // this function deletes the comment, it takes the id of the comment  as a parameter to delete
  // and calls the onDelete() of Comment Service
  onDelete(id) {
    this.commentService.onDelete(id)
      .subscribe(
        responseData => {
        console.log('Delete success');
      });
    this.ngOnInit();
  }
  //increase the count of the like button under the comment
  like(com: Comment) {
    console.log('entered') ;
    this.commentService.onUpdate(com.id, com.comment, com.like)
      .subscribe(
        responseData => {
          console.log('Update Success');
        });
    this.ngOnInit();
  }

  onLoadComments() {
    // get comments on load of the page
    this.commentService.getComments()
      .subscribe(responseData => {
        this.comments = responseData;
        console.log(this.comments);
      }, error => {
        console.log(error);
      });
  }
}
