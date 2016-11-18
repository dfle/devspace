import { Component, Input } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ProfileFeedService } from './profile-feed.service';
import { ProfileComment } from './profile-comment';

@Component({
  selector: 'app-newcomment',
  template: `
      <form (ngSubmit)="onSubmit(f)" #f="ngForm">
        <div class="form-group">
          <label for="comment">Comment</label>
          <input 
            type="text"
            id="comment"
            name="comment"
            [(ngModel)]="comment.content"
            #comment = "ngModel"
            required
            >
        </div>
        <button type="submit" class="btn btn-primary" [disabled]="!f.valid">comment</button>
      </form>
  `
})
export class NewProfileCommentComponent{
  @Input("postId") postId: number;
  comment = {'content': ''}
  profileComment: ProfileComment = null;

  constructor(private _profileFeedService: ProfileFeedService) {  }
  onSubmit(form: NgForm) {
    // console.log("postid in submit", this.postId)
    let newComment = form.value.comment
    form.reset()
    // console.log(newComment)
    this._profileFeedService.sendNewComment(newComment, this.postId)
      .subscribe(
        data => {
          // console.log("comment data===", data)
          this._profileFeedService.profilePosts.map((post)=>{
            console.log("post is", post)
          if(post.id === this.postId){
            post.comments.unshift(data)
          }
          return post
          })
  })
}
}