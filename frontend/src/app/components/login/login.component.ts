import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {signup} from '../../signup.model';
import {ShopDetailsService } from '../../shop-details.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide:true;
  profiledata:String;
  createForm:FormGroup
  constructor( private shopdetailsservice : ShopDetailsService,private router:Router,private loginService: LoginService,private fb:FormBuilder,private snackBar:MatSnackBar) {
    
    this.createForm=this.fb.group({
      email:'',
      password:''
    })
    hide:true;
   }
   login(email,password){
     this.loginService.login(email,password).subscribe((data:signup[])=>{
      //  this.loginService.saveuser(profile);
      this.shopdetailsservice.putCurrUser(data['signupusersdata'][0]);
       this.profiledata=data['signupusersdata'][0]['_id'];
      // console.log(this.profiledata);
      const id=this.profiledata;

       this.snackBar.open("login success",'ok',{ duration:5000});
       this.router.navigate([`/signupdetails/${id}`]);
     },(err)=>{
       console.error(err);
       this.snackBar.open("login failed",'ok',{duration:5000})
     }
     )
   }
   
  ngOnInit(): void {
  }

}
