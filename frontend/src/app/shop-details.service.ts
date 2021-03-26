import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShopDetailsService {
  currentuser:any;
  uri='http://localhost:4000';
  constructor(private http:HttpClient) { }
  getcuruser(){
    return this.currentuser;
  }
  putCurrUser(userobj)
  {
    this.currentuser=userobj
  }
  getshopDetails(){
    return this.http.get(`${this.uri}/shopDetails`);
  }
  shopDetails(id){
    return this.http.get(`${this.uri}/shopDetails/${id}`);
  }
  addshopDetails(name,description,latitude,longitude,rating,review,timing,offers,specials,sales){
    const details={
      name:name,
      description:description,
      latitude:latitude,
      longitude:longitude,
      rating:rating,
      review:review,
      timing:timing,
      offers:offers,
      specials:specials,
      sales:sales
    };
    return this.http.post(`${this.uri}/shopDetails/add`,details);
    }
    updateshopDetails(id,name,latitude,longitude,rating,review,timing,offers,specials,sales){
      const details={
        name:name,
        latitude:latitude,
        longitude:longitude,
        rating:rating,
        review:review,
        timing:timing,
        offers:offers,
        specials:specials,
        sales:sales
      };
      return this.http.post(`${this.uri}/shopDetails/update/${id}`,details);
    }
    deleteshopDetails(id){
      return this.http.get(`${this.uri}/shopDetails/delete/${id}`);
    }
    getshoplocation(){
      return this.http.get(`${this.uri}/nearby`);
    }
    getshoplocationById(id){
      return this.http.get(`${this.uri}/nearbyshops/${id}`);
    }
    addreview(sid,uname,review){
      const issue={
        review:review,
        uname:uname
      }
      return this.http.post(`${this.uri}/bardb/updatereview/${sid}`,issue);
    }
    addrate(value,shopid){
      const issue={
        value:value
      }
      return this.http.post(`${this.uri}/coffe/addrating/${shopid}`,issue);
    }

  }
