import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { UsersignupService } from '../../usersignup.service';
import { LoginService} from '../../login.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { signup } from '../../signup.model';
import { Shopdetails } from '../../shopdetails.model';
import {ShopDetailsService } from '../../shop-details.service';
@Component({
  selector: 'app-signupdetails',
  templateUrl: './signupdetails.component.html',
  styleUrls: ['./signupdetails.component.css']
})
export class SignupdetailsComponent implements OnInit {
  public data;
  personid:String;
  signUp:signup;
  issuebar:Shopdetails[];
  cid:String;
  uid:String;
  userid:String;
  constructor(private shopdetailsservice : ShopDetailsService,private router: Router,private loginservice:LoginService,private route:ActivatedRoute,private Usersignupservice:UsersignupService) {
    this.data=loginservice.getuser();
    // console.log(this.data);
   }
   ngOnInit(): void {
    this.personid = this.route.snapshot.paramMap.get('id');//calling id
    this.fetchIssues();
    // this.userid = this.route.snapshot.paramMap.get('id');
    this.fetchIssuesbar();
    this.updatefavbar(this.cid,this.uid);
    this.removefavbar(this.cid,this.uid);
  }
 fetchIssues() { 
  this. Usersignupservice.getsignupDetailsById(this.personid).subscribe((data: signup) => {
    this.signUp = data;
    // console.log('requested for user details....');
    // console.log(this.signUp);      
  });
}
fetchIssuesbar(){
  this.shopdetailsservice
  .getshopDetails()
  .subscribe((data:Shopdetails[])=>{
    this.issuebar=data;
    // console.log('Data requested....');
    // console.log(this.issuebar);
  });
}
 favChanged(cid,uid,event){
  // console.log('CID=',cid,' uid=',uid);
  // console.log(event.checked);
  if (event.checked ==  true){
    // console.log("added model success");
    this.updatefavbar(cid,uid) 
  }
  else{      
    // console.log("removed model success")
    this.removefavbar(cid,uid) 
  }    
}
updatefavbar(cid,uid){
  this.loginservice.updatefavbar(cid,uid).subscribe(data =>{
    // console.log(data)
  }),(err)=>{
    console.log(err);
  }
}
removefavbar(cid,uid){
  this.loginservice.removefavbar(cid,uid).subscribe(data =>{
    // console.log(data)
  }),(err)=>{
    console.log(err); 
  }
}

checkedfunction(cid){
  // console.log(this.signUp.favouritebars);
  let arraydata=this.signUp.favouritebars;
  for (var i = 0; i < Object.keys(arraydata).length; i++) {
    if(arraydata[i]==cid){
      return true;
    }
  }    
}
tracByBarId(index:number, element:any){
  return element._id;
}

}
