import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
    uri ='http://localhost:4000';
  
    constructor(private http: HttpClient){ }
    private myprofile={}
    saveuser(profile)
    {
        this.myprofile={
            FirstName: profile[0].FirstName,
            LastName: profile[0].LastName,
            age:profile[0].age,
            dateofbirth:profile[0].dateofbirth,
            email:profile[0].email,
            gender:profile[0].gender,
            password:profile[0].password,
            phoneno:profile[0].phoneno
        }
        console.log(this.myprofile);
    }
    getuser(){
        return this.myprofile;
        
    }

    login(email,password){
        const logindetails={
            email:email,
            password:password
        };
        return this.http.post(`${this.uri}/login`,logindetails);
    }
    updatefavbar(shopid,uid){
        const issue={
          shopid:shopid
        }
        return this.http.post(`${this.uri}/userprofile/updatefavbar/${uid}`,issue);
      }
      removefavbar(shopid,uid){
        const issue={
          shopid:shopid
        }
        return this.http.post(`${this.uri}/userprofile/removefavbar/${uid}`,issue);
      }
      checkbar(cid,uid){
        const issue={
          uid:uid
        }
        return this.http.post(`${this.uri}/userprofile/findfavbar/${uid}`,issue);
      }
}
