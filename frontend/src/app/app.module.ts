import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule} from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule} from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ListComponent } from './components/list/list.component';
// import { CreateComponent } from './components/create/create.component';
// import { IssueService } from './issue.service';
import {ShopDetailsService} from './shop-details.service';
import { UsersignupService } from './usersignup.service';
import { LoginComponent } from './components/login/login.component';
// import { SignupeditComponent } from './components/shopreview/signupedit.component';
import { SignupdetailsComponent } from './components/signupdetails/signupdetails.component';
import { UsersignupComponent } from './components/usersignup/usersignup.component';
import { CoffeeshopsComponent } from './components/coffeeshops/coffeeshops.component';
import { HomeComponent } from './components/home/home.component';
import { MoredetailsComponent } from './components/moredetails/moredetails.component';
import { MapComponent } from './components/map/map.component';
import { CoffeeshopFilterPipe } from './components/coffeeshops/coffeeshop-filter.pipe';
import { FormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
// import { ShopreviewComponent } from './components/shopreview/shopreview.component';
// import { ShopmapComponent } from './components/shopmap/shopmap.component';

//import { from } from 'rxjs';
const routes:Routes= [
  // { path : 'create', component:CreateComponent},
  // { path: 'list',component: ListComponent},
  { path: 'login',component:LoginComponent},
  { path: 'signup',component:UsersignupComponent},
  { path:'signupdetails/:id',component:SignupdetailsComponent},
  { path:'coffeeshops',component:CoffeeshopsComponent},
  { path:'home',component:HomeComponent},
  { path:'shopDetails/:id',component:MoredetailsComponent},
  { path:'map',component:MapComponent},
  // { path:'shopreview/:id',component:ShopreviewComponent},
  // {path:'shopmap/:id',component:ShopmapComponent},
  { path:'',redirectTo: 'map', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    // ListComponent,
    // CreateComponent,
    LoginComponent,
    // SignupeditComponent,
    SignupdetailsComponent,
    UsersignupComponent,
    CoffeeshopsComponent,
    HomeComponent,
    MoredetailsComponent,
    MapComponent,
     CoffeeshopFilterPipe,
    //  ShopreviewComponent
    //  ShopmapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSliderModule,
    FormsModule,
    MatSlideToggleModule,
    RouterModule.forRoot(routes),
    MatToolbarModule, MatInputModule, MatSelectModule, MatIconModule,MatButtonModule,MatCardModule,MatTableModule, MatDividerModule, MatSnackBarModule 
  ],
  providers: [ShopDetailsService,UsersignupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
