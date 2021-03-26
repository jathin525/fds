import { Component, OnInit } from '@angular/core';
import { UsersignupService } from '../../usersignup.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
  import { from } from 'rxjs';
@Component({
  selector: 'app-usersignup',
  templateUrl: './usersignup.component.html',
  styleUrls: ['./usersignup.component.css']
})
export class UsersignupComponent implements OnInit {
  createForm: FormGroup;
 // title='fileUpload';
  images;
  constructor( private usersignupService: UsersignupService,private fb: FormBuilder, private route: Router) {
    this.createForm = this.fb.group({
      FirstName:['',Validators.required],
      LastName:['',Validators.required],
      phoneno:'',
      gender:'',
      age:'',
      dateofbirth:'',
      email:['',Validators.required],
      password:['',Validators.required],
      // profile:['',Validators.required]
  
    });   
   }
   selectImage(event){
     if(event.target.files.length>0){
       const file=event.target.files[0];
       this.images=file;
     }
   }
   addsignupDetails(FirstName,LastName,phoneno,gender,age,dateofbirth,email,password){
    this.usersignupService.addsignupDetails(FirstName,LastName,phoneno,gender,age,dateofbirth,email,password).subscribe(()=>{
      this.route.navigate(['/login']);
    });
  }
  ngOnInit(): void {
  }

}
