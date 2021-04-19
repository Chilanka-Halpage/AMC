import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router'
import {Users } from '../data/Users/users'
import { UsersService } from '../data/Users/users.service';
import {ImageService} from '../data/image-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userId : String
  users: Users
  imgSource : String

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private imageService: ImageService
    ) { }
    public imageSrc: string;

  ngOnInit(): void {
    this.userId=this.route.snapshot.params['userId']
    this.users=new Users();
    this.usersService.getUsersById(this.userId).subscribe(data =>{
      console.log(data);
      this.users=data;
    })
    //get image--------------------
    this.imageService.getImage(this.userId).subscribe(
      Response =>{
        this.imgSource = Response;
      }
    )
    this.imageSrc= this.imageService.Image(this.userId);
  }

  editprofile (userId: String){
    this.router.navigate(['editprofile',userId])
    }
}