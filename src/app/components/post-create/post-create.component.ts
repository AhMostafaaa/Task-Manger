import { Component, OnInit } from '@angular/core';
import { PostserviceService } from "../../services/postservice.service";
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/interfaces/post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredTitle='';
  enteredContent='';
  private mode = 'create';
  private postId: string;
  public post: Post;

  constructor(public postsSer: PostserviceService , public route: ActivatedRoute) { }

  onSavePost(form: NgForm){
    if (form.invalid) {
      return;
    }
    if(this.mode === 'create'){
      this.postsSer.addPost(form.value.title, form.value.content)
    }else {
      this.postsSer.updatePost(this.postId,form.value.title,form.value.content)
    }
    
    form.resetForm()
  }


  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postsSer.getPost(this.postId).subscribe(postData => {
          this.post = {id:postData._id,title:postData.title,content:postData.content}
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    })
  }

}
