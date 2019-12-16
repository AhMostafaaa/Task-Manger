import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostserviceService } from "../../services/postservice.service";
import { Post } from '../../interfaces/post.model';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {

   posts: Post [] = []
   private postsSub: Subscription ;

  constructor(public postsSer: PostserviceService) { }

  ngOnInit() {
   this.postsSer.getPosts();
   this.postsSub = this.postsSer.getPostsUpdated().subscribe((posts :Post[])=> { 
     this.posts = posts;
   })
  }

  onDelete(postId: string) {
   this.postsSer.deletePost(postId)
  }
  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }

}
