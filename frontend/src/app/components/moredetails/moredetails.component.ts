import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Shopdetails } from '../../shopdetails.model';
import {ShopDetailsService } from '../../shop-details.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../login.service';
import { signup } from '../../signup.model';
import { UsersignupService } from '../../usersignup.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-moredetails',
  templateUrl: './moredetails.component.html',
  styleUrls: ['./moredetails.component.css']
})
export class MoredetailsComponent implements OnInit {
  isCollapsed:boolean=true;
  ratediv:boolean=true;
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 5;
  min = 0;
  showTicks = false;
  step = 0.2;
  thumbLabel = true;
  value = 0;
  vertical = false;
  tickInterval = 1;
  dataofnow:any;
  id:String;
  issue:Shopdetails;
  createForm: FormGroup;
  reviewlayout:any;
  // shopdetails:Shopdetails[];
  // displayedColumns = ['shopName','latitude','longitude','timings','offers','ratings','reviews','specials','sales','actions'];
  constructor( private snackBar:MatSnackBar, private loginService:LoginService,private shopdetailsservice : ShopDetailsService,private router:Router,private route:ActivatedRoute) { 
  this.dataofnow=loginService.getuser();
  // console.log(this.dataofnow);
}
  toggleCollapse(){
    if(this.dataofnow== null){
     console.log("user not login");this.router.navigate([`/login`]);
    }
    else{
      // this.router.navigate([`/home`]);     
      console.log("user success login");    
      this.isCollapsed=!this.isCollapsed;
    }
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.id);
    this.fetchIssues();
    this.dataofnow=this.shopdetailsservice.getcuruser();
  }
  rateadd(value,shopid){ 
    // console.log(value,shopid);
    this.shopdetailsservice.addrate(value,shopid).subscribe(data =>{
      // console.log(data)
      this.ngOnInit();
      this.snackBar.open('Rated Successfull', 'OK', {duration: 7000});
    }),(err)=>{
      console.log(err);
      this.snackBar.open('Could not able to rate, Try again Later', 'OK', {duration: 7000});
    } 
  }
  ratedivdsipaly(){
    if(this.dataofnow == null){
      console.log("user not login");this.router.navigate([`/login`]);
     }
     else{
       // this.router.navigate([`/home`]);     
       console.log("user success login");    
       this.ratediv=!this.ratediv;
     }
  }
  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

  addreview(bardata,currentusername,review){
    
    this.shopdetailsservice.addreview(bardata,currentusername,review).subscribe(data =>{
      // console.log(data);
      this.ngOnInit();
      this.snackBar.open('Review Added Successfully', 'OK', {duration: 7000});
    }),(err)=>{
      console.log(err);
      this.snackBar.open('Could not able to Add Review, Try again Later', 'OK', {duration: 7000});
    }
  }
  fetchIssues() {
    this.shopdetailsservice.shopDetails(this.id).subscribe((data:Shopdetails) => {
      this.reviewlayout=data['review'];
      // console.log(this.reviewlayout);
      this.issue = data;
      // console.log('Data requested....');
      // console.log(this.issue);
      // console.log(data);
      this.fetchmap();
    });
  }
  fetchmap(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        // console.log(position)
     
      var marker = new L.marker([position.coords.latitude,position.coords.longitude]).bindPopup("You are here").addTo(mymap);
      var circle=L.circle([position.coords.latitude,position.coords.longitude],{
        color:'green',
        fillColor: 'red',
        fillOpacity:0.5,
        radius: 5000
      }).addTo(mymap);
    })
    }
    else{
      console.log("unable to get location")
    }
    const mymap = L.map('mapid').setView([this.issue.latitude, this.issue.longitude], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiMTc2OTlhMDUyMiIsImEiOiJjazlqdHNucXoxbzRpM2VudmZhN2xqMnA2In0.R9g-NOENrhtM4toCHMawDQ'
  }).addTo(mymap);
  var marker = L.marker([this.issue.latitude, this.issue.longitude]).addTo(mymap);
  
 marker.bindPopup(this.issue.name).openPopup();
 
 const map=L.map('mapid',{doubleClickZoom:false}).locate({setView: true,maxZoom: 16});
 }
 
 
}