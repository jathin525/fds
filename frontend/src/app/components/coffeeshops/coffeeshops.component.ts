import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Shopdetails } from '../../shopdetails.model';
import {ShopDetailsService } from '../../shop-details.service';

@Component({
  selector: 'app-coffeeshops',
  templateUrl: './coffeeshops.component.html',
  styleUrls: ['./coffeeshops.component.css']
})
export class CoffeeshopsComponent implements OnInit {
  searchBox:string;
  shopdetails:Shopdetails[];
  constructor( private shopdetailsservice : ShopDetailsService,private router:Router) { }

  ngOnInit(): void {
    this.fetchIssues();
  }
    fetchIssues(){
      this.shopdetailsservice
      .getshopDetails()
      .subscribe((data: Shopdetails[])=>{
        this.shopdetails=data;
        // console.log('Data requested..');
        // console.log(this.shopdetails);
      });
    }
    shopDetails(id){
      this.router.navigate([`/shopDetails/${id}`]);
    }
}
