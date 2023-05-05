import { Component, OnInit } from '@angular/core';
import {UserService} from "../../Service/UserServices/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {user} from "../../Model/User/User";
import {market} from "../../Model/User/market";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  Message!:string;
  user!: user;
  market!:market;
  Success!:string;

  constructor(private _service: UserService , private route: ActivatedRoute ,private router:Router) { }

  ngOnInit(): void {
    this.market=new market();
    const username:any=localStorage.getItem('currentUser');
    if(username) {
      this._service.getUserUsername(username).subscribe(data => {
        console.log(data);
        this.user=data;

      });
    }
    else {
      this.router.navigateByUrl("Error").then(() => {
        window.location.reload();
      });
    }
  }



  updateUserProfile(){
    this.Message='';
    this._service.modifyUser(this.user).subscribe(()=>this.Message='User Updated Successfully ! ');
  }

  addMarket(){
    this._service.addMarket(this.market,this.user.id).subscribe(()=>{this.Success="Market Added Successfully !"});
  }

}
