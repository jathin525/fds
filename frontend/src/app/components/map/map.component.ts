import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Shopdetails } from '../../shopdetails.model';
import {ShopDetailsService } from '../../shop-details.service';
import * as L from 'leaflet';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
   sd:Shopdetails[];
   userlatitude:string;
   userlongitude:string;
   a={};
  constructor(private shopdetailsservice : ShopDetailsService,private router:Router) { }

  ngOnInit(): void {
    this.fetchshops()
  }
  fetchshops(){
    this.shopdetailsservice.getshoplocation()
    .subscribe((data:Shopdetails[])=>{ 
      this.sd=data;
      // console.log('Data requested....');
      // console.log(this.sd);
      
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
          var a={
            userlatitude:position.coords.latitude,
            userlongitude:position.coords.longitude
          }
          const mymap = L.map('mapid').setView([position.coords.latitude,position.coords.longitude], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiMTc2OTlhMDUyMiIsImEiOiJjazlqdHNucXoxbzRpM2VudmZhN2xqMnA2In0.R9g-NOENrhtM4toCHMawDQ'
        }).addTo(mymap);       
        for(var i=0;i<Object.keys(data).length;i++){ 
          // console.log(data[i].latitude) ;
          var marker = new L.marker([data[i].latitude,data[i].longitude])
           .bindPopup(data[i].name) .addTo(mymap); // console.log(this.issue.length) 
        }
           var marker = new L.marker([position.coords.latitude,position.coords.longitude]).bindPopup("You are here").addTo(mymap);
           var circle=L.circle([position.coords.latitude,position.coords.longitude],{
             color:'green',
             fillColor: 'red',
             fillOpacity:0.5,
             radius: 2500
           }).addTo(mymap);
        })
      }
      else{
        console.log("error location")
      }
    })
  }

}