import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {LoginService} from '../../login.service';
import {Shopdetails } from '../../shopdetails.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'pro1';
  shopdetails : Shopdetails[]=[];

  constructor(private router:Router,private loginservice:LoginService) {
   }

  ngOnInit(): void {
    this.shopdetails=[];
  }

}
