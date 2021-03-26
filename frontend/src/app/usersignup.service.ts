import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { EmailValidator } from '@angular/forms';
//import { ɵangular_packages_platform_browser_platform_browser_d } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UsersignupService {
  uri ='http://localhost:4000';

  constructor(private http:HttpClient) { }
  getsignupDetails(){
    return this.http.get(`${this.uri}/signupusersdata`);
  }
  getsignupDetailsById(id){
    return this.http.get(`${this.uri}/signupusersdata/${id}`);
  }
  addsignupDetails(FirstName,LastName,phoneno,gender,age,dateofbirth,email,password){
    const issue={
      FirstName:FirstName,
      LastName:LastName,
      phoneno:phoneno,
      gender:gender,
      age:age,
      dateofbirth:dateofbirth,
      email:email,
      password:password
      // profile:profile
    };
    return this.http.post(`${this.uri}/signup/add`,issue);
  }
  updatesignupDetails(id,FirstName,LastName,phoneno,gender,age,dateofbirth,email,password){
    const issue={
      FirstName:FirstName,
      LastName:LastName,
      phoneno:phoneno,
      gender:gender,
      age:age,
      dateofbirth:dateofbirth,
      email:email,
      password:password
     // profile:profile,
    };
    return this.http.post(`${this.uri}/signup/update/${id}`,issue);
  }
  deletesignupDetails(id){
    return this.http.get(`${this.uri}/signup/delete/${id}`);
  }
}
